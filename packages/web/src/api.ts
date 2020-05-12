import axios from 'axios';
import Cookies from 'universal-cookie';

const token = new Cookies().get('token');
const server = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default server;
