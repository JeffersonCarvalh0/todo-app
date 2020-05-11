import React from 'react';
import styled from 'styled-components';

import TextInput from '../components/TextInput';
import Button from '../components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Login = () => (
  <Container>
    <TextInput label="Email" setValue={() => {}} />
    <TextInput label="Password" setValue={() => {}} obscure />
    <Button marginTop="20px"> Login </Button>
    <Button marginTop="10px"> Create a new account </Button>
  </Container>
);

export default Login;
