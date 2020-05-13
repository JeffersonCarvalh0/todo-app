import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    background: '#032B43',
    primary: '#276FBF',
    accent: '#2EC4B6',
    lightAccent: '#eafaf9',
    error: '#FF3366',
    black: '#02020A',
  },
};

interface Props {
  children: React.ReactNode;
}

const Theme = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
