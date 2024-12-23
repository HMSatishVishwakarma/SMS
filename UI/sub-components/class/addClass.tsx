import axiosInstance from '@/lib/axios-instance';
import { validationAddClassSchema } from '@/validation';
import { ErrorMessage, Field, Formik } from 'formik';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

const initialValue = { className: '', status: 1 };

interface FormValues {
  className: string;
  status: number;
}

const AddClass = (props: any) => {
  const handleSubmit = async (values: FormValues) => {
    console.log(values, '-------sdfsdfsd---------');

    try {
      const response: any = await axiosInstance.post('classes', values);
      props.onClick(response);
    } catch (error) {
      props.onClick('Error');
    }
  };

  return (
    <Row className="justify-content-center mb-8">
      <Col xl={9} lg={8} md={12} xs={12}>
        <Toaster position="top-right" reverseOrder={false} />
        <Formik
          initialValues={initialValue}
          validationSchema={validationAddClassSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isValid,
            dirty,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="className">
                  ClassName:
                </Form.Label>
                <Col md={8} xs={12}>
                  <Field
                    type="text"
                    name="className"
                    onChange={handleChange}
                    placeholder="Enter your class name"
                    value={values.className}
                    id="className"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="className"
                    component="div"
                    className="error-message"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label className="col-md-4" htmlFor="status">
                  Status:
                </Form.Label>
                <Col md={8} xs={12}>
                  <div className="form-check form-check-inline">
                    <Field
                      type="radio"
                      id="active"
                      name="status"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('status', Number(e.target.value));
                      }}
                      value={1}
                      className="form-check-input"
                    />
                    <label htmlFor="active" className="form-check-label">
                      Active
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field
                      type="radio"
                      id="inactive"
                      name="status"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('status', Number(e.target.value));
                      }}
                      value={2}
                      className="form-check-input"
                    />
                    <label htmlFor="inactive" className="form-check-label">
                      Inactive
                    </label>
                  </div>
                  <ErrorMessage
                    name="status"
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

export default AddClass;
