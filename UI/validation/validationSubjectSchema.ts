import * as Yup from 'yup';

export const validationSubjectSchema = Yup.object({
  name: Yup.string().required('Subject name is required'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
});
