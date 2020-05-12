import React from 'react';
import styled from 'styled-components';
import { ErrorMessage as FormikErrorMessage, ErrorMessageProps } from 'formik';

const Container = styled.div`
  color: ${(props) => props.theme.colors.error};
`;

const ErrorMessage = (props: ErrorMessageProps) => (
  <Container>
    <FormikErrorMessage {...props} />
  </Container>
);
export default ErrorMessage;
