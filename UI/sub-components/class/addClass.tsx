import { getAllSubjects } from '@/ services/apiService';
import { DataItem, FormValues, Option } from '@/interface';
import axiosInstance from '@/lib/axios-instance';

import { transformDataToOptions } from '@/utils';
import { validationAddClassSchema } from '@/validation';

import { ErrorMessage, Field, Formik } from 'formik';
import MultiSelect from 'multiselect-react-dropdown';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

interface AddClassProps {
  onClick: (response: string) => void;
  initialValues?: FormValues;
}

const AddClass: React.FC<AddClassProps> = ({ onClick, initialValues }) => {
  const [subjectList, setSubjectList] = useState<Option[]>([]);

  const defaultValues: FormValues = {
    className: '',
    status: 1,
    subject: [], // This should be an empty array initially
  };

  const mergedValues = { ...defaultValues, ...initialValues };

  const handleSubmit = async (values: FormValues) => {
    try {
      let response = '';
      if (mergedValues && mergedValues._id) {
        response = await axiosInstance.put(
          `classes/${mergedValues._id}`,
          values,
        );
      } else {
        response = await axiosInstance.post('classes', values);
      }
      onClick(response);
    } catch (error) {
      onClick('Error');
    }
  };

  const getSubjectList = async () => {
    try {
      const response: { data: DataItem[] } = await getAllSubjects();
      setSubjectList(transformDataToOptions(response.data));
    } catch (error) {
      console.error('Error fetching subject list:', error);
    }
  };

  useEffect(() => {
    getSubjectList();
  }, []);

  return (
    <Row className="justify-content-center mb-4">
      <Col xl={8} lg={9} md={12} xs={12}>
        <Toaster position="top-right" reverseOrder={false} />
        <Formik
          initialValues={mergedValues}
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
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Label
                  className="col-sm-4 col-form-label"
                  htmlFor="className"
                >
                  Class Name:
                </Form.Label>
                <Col sm={8} xs={12}>
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
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label
                  className="col-sm-4 col-form-label"
                  htmlFor="subject"
                >
                  Select Subject:
                </Form.Label>
                <Col sm={8} xs={12}>
                  <MultiSelect
                    options={subjectList}
                    selectedValues={values.subject}
                    onSelect={(selectedList: Option[]) =>
                      setFieldValue('subject', selectedList)
                    }
                    onRemove={(removedList: Option[]) =>
                      setFieldValue('subject', removedList)
                    }
                    displayValue="name"
                    className="w-100"
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label
                  className="col-sm-4 col-form-label"
                  htmlFor="status"
                >
                  Status:
                </Form.Label>
                <Col sm={8} xs={12}>
                  <div className="form-check form-check-inline">
                    <Field
                      type="radio"
                      id="active"
                      name="status"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue('status', Number(e.target.value))
                      }
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue('status', Number(e.target.value))
                      }
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
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col sm={12} className="d-flex justify-content-end">
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
