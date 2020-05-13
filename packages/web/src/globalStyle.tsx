import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    min-height: 100%;
    width: 100%;
    margin: 0;
    overflow: auto;
  }

  body {
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
