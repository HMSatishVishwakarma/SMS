import * as Yup from 'yup';

export const validationAddClassSchema = Yup.object({
  className: Yup.string().required('Class name is required'),
  status: Yup.number().required('Status is required'),
});
