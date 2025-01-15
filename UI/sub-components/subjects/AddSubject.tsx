import axiosInstance from '@/lib/axios-instance';
import { validationSubjectSchema } from '@/validation';
// Assuming you have a validation schema
import { ErrorMessage, Field, Formik } from 'formik';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

interface FormValues {
  name: string;
  description: string;
}

const AddSubject = ({ onClick, initialValues }: any) => {
  const defaultValues = {
    name: '',
    description: '',
  };

  const mergedValues = { ...defaultValues, ...initialValues };

  const handleSubmit = async (values: FormValues) => {
    try {
      let response = '';
      if (mergedValues && mergedValues._id) {
        response = await axiosInstance.put(
          `subject/${mergedValues._id}`,
          values,
        );
      } else {
        response = await axiosInstance.post('subject', values);
      }
      onClick(response);
    } catch (error) {
      console.log('ERROR--------->');
      // onClick('Error');
    }
  };

  return (
    <Row className="justify-content-center mb-8">
      <Col xl={9} lg={8} md={12} xs={12}>
        <Toaster position="top-right" reverseOrder={false} />
        <Formik
          initialValues={mergedValues}
          validationSchema={validationSubjectSchema} // Replace with actual validation schema
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit, isValid, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="name">
                  Subject Name:
                </Form.Label>
                <Col md={8} xs={12}>
                  <Field
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter subject name"
                    value={values.name}
                    id="name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="description">
                  Description:
                </Form.Label>
                <Col md={8} xs={12}>
                  <Field
                    as="textarea"
                    name="description"
                    onChange={handleChange}
                    placeholder="Enter a description"
                    value={values.description}
                    id="description"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!(isValid && dirty)}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default AddSubject;
