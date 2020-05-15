import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';

import server from '../api';
import Button from '../components/Button';
import FullLoading from '../components/FullLoading';
import TodoCard from '../components/TodoCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: flex-start;
  width: 100%;
  height: 100%;
`;

const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  align-self: center;
`;

const AddIcon = styled(MdAddCircle)`
  width: 4vw;
  height: 4vw;
  align-self: center;
  &:active {
    transform: translate(2px, 2px);
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [todos, setTodos] = useState<
    { title: string; description: string; done: boolean; id: number }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshTodos, setRefreshTodos] = useState(true);
  const [newTodoBeingAdded, setNewTodoBeingAdded] = useState(false);
  const cookies = new Cookies();

  const toggleRefresh = () => {
    setRefreshTodos((prev) => !prev);
  };

  const fetchUserData = async () => {
    setLoading(true);
    server
      .get('/user')
      .then((response) => {
        const body = response.data.data;
        setUserData((prev) => ({
          ...prev,
          name: body.name,
          email: body.email,
        }));
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchTodos = async () => {
    setLoading(true);
    server
      .get('/todo')
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [refreshTodos]);

  return errorMessage ? (
    <Redirect
      to={{ pathname: '/login', state: { fetchUserDataError: errorMessage } }}
    />
  ) : (
    <Container>
      <FullLoading show={loading} />
      <Button
        onClick={() => {
          cookies.set('token', '');
          window.location.reload();
        }}
      >
        Logoff
      </Button>
      <h1>Greetings, {userData.name}</h1>
      <TodosContainer>
        {newTodoBeingAdded ? (
          <TodoCard
            todo={{ title: '', description: '', done: false }}
            onEditCancel={() => setNewTodoBeingAdded(false)}
            onSave={() => {
              setNewTodoBeingAdded(false);
              toggleRefresh();
            }}
          />
        ) : (
          <AddIcon onClick={() => setNewTodoBeingAdded(true)} />
        )}
        {todos.length === 0 ? (
          <h4>No Todos were found</h4>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={{
                title: todo.title,
                description: todo.description,
                done: todo.done,
                id: todo.id,
              }}
            />
          ))
        )}
      </TodosContainer>
    </Container>
  );
};

export default Dashboard;
