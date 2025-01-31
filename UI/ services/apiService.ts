import axiosInstance from '@/lib/axios-instance';

export const getAllClasses = async () => {
  return await axiosInstance.get(`/classes`);
};

export const getAllSubjects = async () => {
  return await axiosInstance.get(`/subject/all`);
};
