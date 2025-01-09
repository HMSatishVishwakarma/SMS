// import node module libraries
import { ErrorMessage, Formik } from 'formik';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

import { AddStudentSchema } from '../../validation';

import toast, { Toaster } from 'react-hot-toast';

import 'bootstrap-daterangepicker/daterangepicker.css';
import FormData from 'form-data';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import axiosInstance from '@/lib/axios-instance';
import { useRouter } from 'next/router';

import { getAllClasses } from '@/ services/apiService';
import { useEffect, useState } from 'react';
import { DropFiles } from './../../widgets';

interface InitialValues {
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  class: string;
  gender: string;
  dob: string;
  image: object;
  email: string;
  emergencyContactNumber: string;
}

const AddStudent = () => {
  const {
    query: { id },
    ...router
  } = useRouter();

  const initialValues: InitialValues = {
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    class: '',
    gender: '',
    dob: '',
    email: '',
    image: {},
    emergencyContactNumber: '',
  };

  const [initValue, setInitValue] = useState(initialValues);

  const [classData, setClassData] = useState([]);

  const fetchStudentDetailsById = async (id: any) => {
    if (id) {
      const response: any = await axiosInstance.get('students/' + id);

      setInitValue(response.data);
    } else {
      setInitValue(initialValues);
    }
  };

  const getAllClassesData = async () => {
    const response = await getAllClasses();

    setClassData(response.data);
  };

  useEffect(() => {
    getAllClassesData();
  }, []);

  useEffect(() => {
    fetchStudentDetailsById(id);
  }, [id]);

  const addStudent = async (formData: InitialValues) => {
    try {
      let data: any = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value);
      }
      const response = await axiosInstance.post('students', data);

      const message = data.get('_id')
        ? ' Student update successfully.'
        : 'Student save successfully.';

      toast.success(message);
      return response;
    } catch (error) {
      toast.error('Error');
    }
  };

  return (
    <Row className="justify-content-center mb-8">
      <Col xl={9} lg={8} md={12} xs={12}>
        {/* card */}
        <Card id="edit">
          {/* card body */}
          <Card.Body className="mt-5">
            <Toaster position="top-right" reverseOrder={false} />

            <Formik
              initialValues={initValue}
              enableReinitialize={true}
              validationSchema={AddStudentSchema}
              onSubmit={async (values: any, { setSubmitting, resetForm }) => {
                try {
                  await addStudent(values);
                  setSubmitting(false);
                  resetForm();
                  router.push('/pages/listStudent');
                } catch (error) {
                  toast.error('Error');
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="newEmailAddress">
                      First Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        value={values.firstName}
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        id="firstName"
                      />

                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="error-message"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="lastName">
                      Last Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        id="lastName"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="error-message"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="fatherName">
                      Father Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        onChange={handleChange}
                        value={values.fatherName}
                        type="text"
                        name="fatherName"
                        placeholder="Enter your father name"
                        id="fatherName"
                      />
                      <ErrorMessage
                        name="fatherName"
                        component="div"
                        className="error-message"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="motherName">
                      Mother Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        name="motherName"
                        onChange={handleChange}
                        value={values.motherName}
                        type="text"
                        placeholder="Enter your Mother name"
                        id="motherName"
                      />

                      <ErrorMessage
                        name="motherName"
                        component="div"
                        className="error-message"
                      ></ErrorMessage>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="email">
                      Email Id <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        type="text"
                        placeholder="Enter your email id"
                        id="motherName"
                      />

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      ></ErrorMessage>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="fatherName">
                      Class <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Select
                        name="class"
                        onChange={handleChange}
                        value={values.class}
                        aria-label="Default select example"
                      >
                        <option value="">Please select</option>
                        {classData?.data &&
                          classData?.data.map(
                            (i: { _id: string; className: string }) => (
                              <option key={i._id} value={i._id}>
                                {i.className}
                              </option>
                            ),
                          )}
                      </Form.Select>
                      <ErrorMessage
                        name="class"
                        component="div"
                        className="error-message"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-md-4" htmlFor="default">
                      Gender <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Check
                        id="customRadioInline1"
                        className="form-check-inline"
                      >
                        <Form.Check.Input
                          type="radio"
                          id="male"
                          value="male"
                          checked={values.gender === 'male'}
                          onChange={handleChange}
                          name="gender"
                        />
                        <Form.Check.Label>Male</Form.Check.Label>
                      </Form.Check>
                      <Form.Check
                        id="customRadioInline2"
                        className="form-check-inline"
                      >
                        <Form.Check.Input
                          id="female"
                          value="female"
                          checked={values.gender === 'female'}
                          type="radio"
                          onChange={handleChange}
                          name="gender"
                        />
                        <Form.Check.Label>Female</Form.Check.Label>
                      </Form.Check>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="error-message"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="DOB">
                      DOB <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <DateRangePicker
                        initialSettings={{
                          singleDatePicker: true,
                          showDropdowns: true,
                          locale: {
                            format: 'MM/DD/YYYY',
                            // other locale settings...
                          },
                          //   startDate: moment(values.dob).format('DD-MM-YYYY'),
                        }}
                        onCallback={(start) => {
                          setFieldValue(
                            'dob',
                            moment(start).format('YYYY-MM-DD'),
                          );
                        }}
                      >
                        <input
                          type="text"
                          name="dob"
                          className="form-control col-4"
                          id="dob"
                          onChange={handleChange}
                          value={values.dob}
                        />
                      </DateRangePicker>

                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="error-message"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label
                      className="col-sm-4"
                      htmlFor="emergencyContactNumber"
                    >
                      Emergency Contact Number{' '}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        name="emergencyContactNumber"
                        onChange={handleChange}
                        value={values.emergencyContactNumber}
                        type="text"
                        placeholder="Enter emergency contact number"
                        id="emergencyContactNumber"
                        className="form-control col-4"
                      />
                      <ErrorMessage
                        name="emergencyContactNumber"
                        component="div"
                        className="error-message"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Form.Label className="col-md-4" htmlFor="default">
                      Profile photo
                    </Form.Label>

                    <Col md={8} xs={12}>
                      <div className="dropzone mb-3 border-dashed py-10">
                        <DropFiles
                          imageData={values.image}
                          onCallback={(data: any) => {
                            setFieldValue('image', data[0]);
                          }}
                        />
                      </div>

                      {/*  <img
                        className="rounded-circle avatar-md"
                        src={values.profileImage.profile}
                        height="30"
                        width="30"
                      /> */}

                      {errors.image && touched.image && (
                        <div className="error-message">{errors.image}</div>
                      )}
                    </Col>

                    <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                      <Button
                        variant="primary"
                        type="submit"
                        //  disabled={isSubmitting}
                      >
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddStudent;
