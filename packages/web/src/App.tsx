import React from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';

import GlobalStyle from './globalStyle';
import Theme from './Theme';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Button from './components/Button';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
`;

const App = () => {
  const cookies = new Cookies();
  const isTokenSet = cookies.get('token');
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
              <div>
                <Button
                  onClick={() => {
                    cookies.set('token', '');
                    window.location.reload();
                  }}
                >
                  Logoff
                </Button>
              </div>
            </Route>
          </Switch>
        </Container>
      </Theme>
    </>
  );
};

export default App;
