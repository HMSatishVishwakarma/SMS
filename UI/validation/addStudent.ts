import * as Yup from 'yup';

export const AddStudentSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters long.')
    .max(50, 'First name cannot be more than 50 characters long.')
    .required('First name is required.'),

  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters long.')
    .max(50, 'Last name cannot be more than 50 characters long.')
    .required('Last name is required.'),

  fatherName: Yup.string()
    .min(2, "Father's name must be at least 2 characters long.")
    .max(50, "Father's name cannot be more than 50 characters long.")
    .required("Father's name is required."),

  motherName: Yup.string()
    .min(2, "Mother's name must be at least 2 characters long.")
    .max(50, "Mother's name cannot be more than 50 characters long.")
    .required("Mother's name is required."),

  email: Yup.string()
    .min(2, 'Email must be at least 2 characters long.')
    .max(50, 'Email cannot be more than 50 characters long.')
    .required('Email address is required.')
    .email('Please enter a valid email address.'),

  class: Yup.string().required('Please select a class.'),
  dob: Yup.string().required('Please select a Date of Birth.'),

  gender: Yup.string().required('Please select a gender.'),

  // Add validation for emergencyContactNumber here
  emergencyContactNumber: Yup.string()
    .required('Emergency contact number is required.')
    .matches(
      /^[0-9]{10}$/,
      'Emergency contact number must be a valid 10-digit phone number.',
    ),

  image: Yup.mixed()
    .required('Profile image is required') // Make it required
    .test(
      'fileType',
      'Only image files are allowed (JPG, PNG, JPEG)',
      (value) => {
        // Ensure the file exists before calling .startsWith()
        return value && value.type && value.type.startsWith('image/');
      },
    )
    .test(
      'fileSize',
      'File size is too large (max 5MB)',
      (value) => value && value.size <= 5 * 1024 * 1024, // 5MB limit
    ),
});

export const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
