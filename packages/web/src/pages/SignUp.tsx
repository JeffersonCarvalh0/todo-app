import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';

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

const SignUp = () => {
  const [success, setSuccess] = useState(false);

  return success ? (
    <Redirect to={{ pathname: '/login', state: { accountCreated: true } }} />
  ) : (
    <Formik
      initialValues={{
        Name: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
      }}
      validationSchema={Yup.object({
        Name: Yup.string().required(),
        Email: Yup.string().required().email(),
        Password: Yup.string().required(),
        ConfirmPassword: Yup.string().oneOf(
          [Yup.ref('Password'), null],
          "Passwords don't match",
        ),
      })}
      onSubmit={async (values, { setStatus }) => {
        server
          .post('/user', {
            name: values.Name,
            email: values.Email,
            password: values.Password,
          })
          .then((response) => {
            if (response.status === 201) setSuccess(true);
          })
          .catch((error) => {
            setStatus(error.response.data.message);
          });
      }}
    >
      {(formik) => (
        <Form>
          <FullLoading show={formik.isSubmitting} />
          <Container>
            {formik.status && (
              <ApiErrorMessage>{formik.status}</ApiErrorMessage>
            )}
            <TextInput name="Name" />
            <ErrorMessage name="Name" />
            <TextInput name="Email" />
            <ErrorMessage name="Email" />
            <TextInput name="Password" obscure />
            <ErrorMessage name="Password" />
            <TextInput
              name="ConfirmPassword"
              label="Confirm Password"
              obscure
            />
            <ErrorMessage name="ConfirmPassword" />

            <Button type="submit" marginTop="60px">
              Sign Up
            </Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
