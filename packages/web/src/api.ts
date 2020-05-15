import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const server = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api'
      : 'https://todo-app-server0.herokuapp.com/api',
});

server.interceptors.request.use((config) => {
  const token = cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

server.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      cookies.set('token', '');
      window.location.reload();
    }

    // https://github.com/axios/axios/issues/41#issuecomment-386762576
    return Promise.reject(error);
  },
);

export default server;
