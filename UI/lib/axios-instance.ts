import config from '@/config';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getSession, signOut } from 'next-auth/react';

const { apiBaseUrl } = config;

// Create an Axios instance with baseURL from config
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

// Request interceptor to attach the Authorization header if the user is authenticated
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    const token = session?.user?.access_token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response) {
      const { status, data } = error.response;

      const errorMessages: Record<number, string | any> = {
        401: 'Access Token expired. Signing out...',
        403: data || 'Forbidden: Access denied.',
        503: 'Service Unavailable: The server is not running.',
        500: 'Internal Server Error: Something went wrong on the server.',
      };

      if (status === 401 && originalConfig && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
        } catch (_error: any) {
          return Promise.reject(_error?.response?.data || _error);
        } finally {
          signOut({ callbackUrl: '/' }); // Log the user out if token refresh fails
        }
      }

      // Handle other predefined error status codes (403, 503, 500)
      if (errorMessages[status]) {
        console.error(`${status} Error:`, error);
        return Promise.reject({ message: errorMessages[status], data });
      }

      // Handle any unhandled error status codes
      console.error(`Unhandled Error ${status}:`, error);
      return Promise.reject({ message: `An error occurred: ${status}`, data });
    }

    // Handle network errors (e.g., no response)
    console.error('Network Error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
