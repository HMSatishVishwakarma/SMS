import * as Yup from 'yup';

export const validationAddClassSchema = Yup.object({
  className: Yup.string().required('Class name is required'),
  status: Yup.number().required('Status is required'),
  subject: Yup.array()
    .min(1, 'At least one option must be selected') // Ensures at least one option is selected
    .required('Please select at least one option'), // Ensures the multi-select field is not empty
});
