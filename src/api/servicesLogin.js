import client, { setAuthorizationHeader } from './client';

export const login = credentials => {
  return client
    .post('/api/auth/login', credentials)
    .then(response => setAuthorizationHeader(response.accessToken));
};