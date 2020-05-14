import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

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

const AccountCreatedMessage = styled.h3`
  text-align: center;
`;

const LinkButton = styled(Link)`
  display: flex;
  text-decoration: none;
`;

interface Props {
  location?: {
    state: {
      accountCreated: boolean;
    };
  };
}

const Login = (props: Props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <Formik
      initialValues={{ Email: '', Password: '' }}
      validationSchema={Yup.object({
        Email: Yup.string().required().email(),
        Password: Yup.string().required(),
      })}
      onSubmit={async (values, { setStatus }) => {
        server
          .post('/login', {
            email: values.Email,
            password: values.Password,
          })
          .then((response) => {
            const token = response.data.data.token;
            server.defaults.headers.common = {
              Authorization: `Bearer ${token}`,
            };
            new Cookies().set('token', token);
            setLoggedIn(true);
          })
          .catch((error) => {
            if (error.response) {
              setStatus(error.response.data.message);
            }
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
            {props.location &&
              props.location.state &&
              props.location.state.accountCreated && (
                <AccountCreatedMessage>
                  Account successfully created!
                </AccountCreatedMessage>
              )}
            <TextInput name="Email" />
            <ErrorMessage name="Email" />
            <TextInput name="Password" obscure />
            <ErrorMessage name="Password" />

            <Button type="submit" marginTop="20px">
              Login
            </Button>
            <LinkButton to="/signup">
              <Button marginTop="10px"> Create a new account </Button>
            </LinkButton>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
