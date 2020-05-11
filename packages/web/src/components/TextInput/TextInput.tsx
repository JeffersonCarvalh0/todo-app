import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.colors.lightAccent};
  border: none;
  padding: 1vw 1vh;
  text-align: center;
  height: 5%;
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
  label?: string;
  setValue: Function;
}

const TextInput = ({ label, setValue }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <Wrapper>
      {label && label !== '' ? <Label>{label}</Label> : <></>}
      <StyledInput data-testid="TextInput" onChange={handleChange} />
    </Wrapper>
  );
};

export default TextInput;
