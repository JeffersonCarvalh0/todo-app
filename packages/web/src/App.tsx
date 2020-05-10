import React from 'react';
import styled from 'styled-components';

import GlobalStyle from './globalStyle';
import Theme from './Theme';
import Login from './pages/Login';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Theme>
        <Container>
          <Login />
        </Container>
      </Theme>
    </>
  );
}

export default App;
