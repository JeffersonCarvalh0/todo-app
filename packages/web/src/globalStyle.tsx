import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Roboto;
    font-size: calc(1em + 1vw);
  }
  button {
    font-family: Roboto;
    font-size: inherit;
  }
  input {
    font-family: Roboto;
    font-size: inherit;
  }
`;

export default GlobalStyle;
