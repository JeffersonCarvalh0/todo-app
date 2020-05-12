import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect, Link } from 'react-router-dom';

import TextInput from '../components/TextInput';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import FullLoading from '../components/FullLoading';
import server from '../api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ApiErrorMessage = styled.h3`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
`;

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <Formik
      initialValues={{ Email: '', Password: '' }}
      validationSchema={Yup.object({
        Email: Yup.string().required().email(),
        Password: Yup.string().required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        server
          .post('/login', {
            email: values.Email,
            password: values.Password,
          })
          .then((response) => {
            if (response) {
              if (response.data.data.token) {
                server.defaults.headers.common = {
                  Authorization: `Bearer ${response.data.data.token}`,
                };
                setLoggedIn(true);
              }
            }
          })
          .catch((error) => {
            if (error) {
              setErrorMessage(error.response.data.message);
            }
          })
          .then(() => {
            setSubmitting(false);
          });
      }}
    >
      {(formik) => (
        <Form>
          <FullLoading show={formik.isSubmitting} />
          <Container>
            {errorMessage ? (
              <ApiErrorMessage>{errorMessage}</ApiErrorMessage>
            ) : (
              <></>
            )}
            <TextInput name="Email" />
            <ErrorMessage name="Email" />
            <TextInput name="Password" obscure />
            <ErrorMessage name="Password" />

            <Button type="submit" marginTop="20px">
              Login
            </Button>
            <Link to="/signup">
              <Button marginTop="10px"> Create a new account </Button>
            </Link>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
