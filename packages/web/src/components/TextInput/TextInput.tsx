import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled(Field)`
  background-color: ${(props) => props.theme.colors.lightAccent};
  padding: 20px;
  text-align: center;
  transition: border-color 250ms ease;
  border: 2px solid;
  border-radius: 50px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const Label = styled.h4`
  text-align: left;
  margin-bottom: 1px;
  margin-left: 1vw;
`;

interface Props {
  name: string;
  label?: string;
  obscure?: boolean;
}

const TextInput = ({ name, label, obscure = false }: Props) => {
  return (
    <Wrapper>
      <Label>{label || name}</Label>
      <Input
        name={name}
        data-testid="TextInput"
        type={obscure ? 'password' : 'text'}
      />
    </Wrapper>
  );
};

export default TextInput;
