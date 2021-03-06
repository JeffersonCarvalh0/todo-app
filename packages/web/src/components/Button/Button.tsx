import React from 'react';
import styled from 'styled-components';

interface StyledProps {
  marginTop?: string;
}

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.accent};
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  transition: opacity 250ms ease;
  margin-top: ${(props: StyledProps) => props.marginTop || '0px'};
  flex: 1;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode;
}

const Button = ({
  onClick,
  type,
  children,
  marginTop,
}: Props & StyledProps) => {
  return (
    <StyledButton type={type} onClick={onClick} marginTop={marginTop}>
      {children}
    </StyledButton>
  );
};

export default Button;
