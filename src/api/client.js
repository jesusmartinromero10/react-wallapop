import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001',
});
client.interceptors.response.use(response => response.data);

export const setAuthorizationHeader = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export default client;
