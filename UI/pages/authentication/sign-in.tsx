// import node module libraries
import { ErrorMessage, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-bootstrap-icons';
import toast, { Toaster } from 'react-hot-toast';
import AuthLayout from '../../layouts/AuthLayout';
import { SignInSchema } from '../../validation';

import { useRouter } from 'next/router';

// import authlayout to override default layout

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const router = useRouter();
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-xl-0 py-8">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="mb-4">
              <Link href="/">
                {/* <Image
                  src="/images/brand/logo/logo-primary.svg"
                  className="mb-2"
                  alt=""
                /> */}
              </Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}

            <Formik
              initialValues={initialValues}
              validationSchema={SignInSchema}
              onSubmit={async (values: any, { setSubmitting, resetForm }) => {
                try {
                  const response = await signIn('credentials', {
                    redirect: false,
                    username: 'uj8vt9qp',
                    password: 'Test@123',
                  });

                  if (response?.status == 200) {
                    setTimeout(() => {
                      toast.success('Login successfully.');
                      setSubmitting(false);
                      router.push('/');
                      resetForm();
                    }, 400);
                  } else if (
                    response?.error !== null &&
                    response?.status === 401
                  ) {
                    toast.error(response?.error);
                  }
                } catch (error: any) {
                  toast.error(error.response.data.message);
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
              }) => (
                <Form onSubmit={handleSubmit}>
                  {JSON.stringify(errors)}
                  {/* Username */}
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username or email</Form.Label>
                    <Form.Control
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      placeholder="Enter address here"
                    />
                    <ErrorMessage name="username" component="div" />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      placeholder="**************"
                    />
                    <ErrorMessage name="password" component="div" />
                  </Form.Group>

                  {/* Checkbox */}
                  <div className="d-lg-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox" id="rememberme">
                      <Form.Check.Input type="checkbox" />
                      <Form.Check.Label>Remember me</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div>
                    {/* Button */}
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Sign In
                      </Button>
                    </div>
                    <div className="d-md-flex justify-content-between mt-4">
                      <div className="mb-md-0 mb-2">
                        <Link href="/authentication/sign-up" className="fs-5">
                          Create An Account{' '}
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/authentication/forget-password"
                          className="fs-5 text-inherit"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
