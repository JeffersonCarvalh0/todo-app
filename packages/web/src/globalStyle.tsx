import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, #root, .app {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100vh;
    height: 100vh;
    width: 100vw;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    min-height: 100vh;
    width: 100%;
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
