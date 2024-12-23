import config from '@/config';
import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const payload = {
          username: credentials.username,
          password: credentials.password,
        };
        const url = config?.apiBaseUrl + '/auth/login';

        try {
          console.log('->', url);
          const response = await axios.post(url, payload);

          //    console.log(response.data, 'response.data');

          const { userName, role, email, access_token, _id } = response.data;

          return {
            _id,
            access_token,
            email,
            role,
            userName,
          };
        } catch (error) {
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],

  port: 8082,
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },

  callbacks: {
    /*     async signIn({ user, account, profile, email, credentials }) {
      const router = useRouter();

      console.log(user, 'user');
      if (!user.error) {
        router.push('/dashboard'); // Redirect to dashboard on successful login
      }
      return false; // Prevent NextAuth default redirect behavior
    },
 */

    async signIn({ user, account, profile, email, credentials }) {
      if (user.hasOwnProperty('error')) {
        let userError = user?.error;
        throw new Error(userError);
      }
      return true;
    },
    async jwt({ user, token, session, trigger, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      user && (token.user = user);

      /* // console.log(trigger, 'trigger');
      if (trigger === 'update') {
        if (typeof session.accessToken !== 'undefined') {
      //    token.user.token = session.accessToken;
        }
      } */
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = { ...token.user }; // Set session data to the token
      }

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
