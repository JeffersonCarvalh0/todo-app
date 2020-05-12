import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../components/TextInput';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import FullLoading from '../components/FullLoading';
import server from '../api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 250ms ease;
`;

const ApiErrorMessage = styled.h3`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
`;

const Login = () => {
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
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
              if (response.data.data.token) setToken(response.data.data.token);
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
            {token ? <h1>{token}</h1> : <></>}
            {errorMessage ? (
              <ApiErrorMessage>{errorMessage}</ApiErrorMessage>
            ) : (
              <></>
            )}
            <TextInput label="Email" />
            <ErrorMessage name="Email" />
            <TextInput label="Password" obscure />
            <ErrorMessage name="Password" />
            <Button type="submit" marginTop="20px">
              Login
            </Button>
            <Button marginTop="10px"> Create a new account </Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
