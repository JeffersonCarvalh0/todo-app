import React from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';

import GlobalStyle from './globalStyle';
import Theme from './Theme';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

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
  const isTokenSet = new Cookies().get('token');
  return (
    <>
      {isTokenSet ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      <GlobalStyle />
      <Theme>
        <Container>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard">
              <div> Dashboard </div>
            </Route>
          </Switch>
        </Container>
      </Theme>
    </>
  );
};

export default App;
