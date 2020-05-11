import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Roboto;
    font-size: calc(1em + 1vw);
    color: #fff;
  }
  button {
    font-family: Roboto;
    font-size: inherit;
    color: #032B43;
  }
  input {
    font-family: Roboto;
    font-size: inherit;
    color: #032B43;
  }
`;

export default GlobalStyle;
