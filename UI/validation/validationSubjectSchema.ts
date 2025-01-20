import * as Yup from 'yup';

export const validationSubjectSchema = Yup.object({
  name: Yup.string().required('Subject name is required'),
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters'),
  subject: Yup.array()
    .min(1, 'At least one option must be selected') // Validates that at least one option is selected
    .required('Please select at least one option'), // Required field validation
});
