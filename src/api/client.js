import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001',
});
client.interceptors.response.use(response => response.data); //intercepta la respuesta de la api y devuelve el data de la repuesta en vez del objeto entero

export const setAuthorizationHeader = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`; //pone el token por defecto en la cabecera
};
export default client;
