import React from 'react';
import styled from 'styled-components';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import TextInput from '../components/TextInput';
import Button from '../components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Login = () => {
  return (
    <Formik
      initialValues={{ Email: '', Password: '' }}
      validationSchema={Yup.object({
        Email: Yup.string().required().email(),
        Password: Yup.string().required(),
      })}
      onSubmit={() => {}}
    >
      <Form>
        <Container>
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
    </Formik>
  );
};

export default Login;
