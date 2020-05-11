import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.accent};
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  transition: opacity 250ms ease;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: Props) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
