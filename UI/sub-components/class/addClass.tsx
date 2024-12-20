import { ErrorMessage, Formik } from 'formik';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

interface FormProps {
  labelClassName?: string;
  inputClassName?: string;
  onSubmit: (formData: { [key: string]: string }) => void;
}

const AddClass: React.FC<FormProps> = ({
  labelClassName,
  inputClassName,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Row className="justify-content-center mb-8">
      <Col xl={9} lg={8} md={12} xs={12}>
        {/* card */}

        {/* card body */}

        <Toaster position="top-right" reverseOrder={false} />

        <Formik>
          {({}) => (
            <Form onSubmit={handleSubmit}>
              {/* New email */}

              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="ClassName">
                  ClassName :
                </Form.Label>
                <Col md={8} xs={12}>
                  <Form.Control
                    // value={values.firstName}
                    type="text"
                    name="classeName"
                    onChange={handleChange}
                    placeholder="Enter your class name"
                    id="classeName"
                  />

                  <ErrorMessage name="classeName" component="div" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label className="col-md-4" htmlFor="default">
                  Status :
                </Form.Label>
                <Col md={8} xs={12}>
                  <Form.Check
                    id="customRadioInline1"
                    className="form-check-inline"
                  >
                    <Form.Check.Input
                      type="radio"
                      id="active"
                      value="1"
                      onChange={handleChange}
                      name="status"
                    />
                    <Form.Check.Label>Active</Form.Check.Label>
                  </Form.Check>
                  <Form.Check
                    id="customRadioInline2"
                    className="form-check-inline"
                  >
                    <Form.Check.Input
                      id="inactive"
                      value="2"
                      type="radio"
                      onChange={handleChange}
                      name="status"
                    />
                    <Form.Check.Label>InActive</Form.Check.Label>
                    <ErrorMessage name="status" component="div" />
                  </Form.Check>
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
