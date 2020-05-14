import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

import server from '../api';
import Button from '../components/Button';
import FullLoading from '../components/FullLoading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
`;

const Dashboard = () => {
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [userData, setUserData] = useState({ name: '', email: '', todos: [] });
  const [errorMessage, setErrorMessage] = useState('');
  const cookies = new Cookies();

  const fetchUserData = async () => {
    server
      .get('/user')
      .then((response) => {
        const body = response.data.data;
        setUserData({ name: body.name, email: body.email, todos: body.todos });
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        }
      })
      .finally(() => {
        setLoadingUserData(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container>
      <FullLoading show={loadingUserData} />
      <h1>WILLKOMMEN, HERR {userData.name}</h1>
      <Button
        onClick={() => {
          cookies.set('token', '');
          window.location.reload();
        }}
      >
        Logoff
      </Button>
    </Container>
  );
};

export default Dashboard;
