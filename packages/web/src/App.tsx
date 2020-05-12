import React from 'react';
import styled from 'styled-components';

import GlobalStyle from './globalStyle';
import Theme from './Theme';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Switch, Route } from 'react-router-dom';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Theme>
        <Container>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>

            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Container>
      </Theme>
    </>
  );
};

export default App;
