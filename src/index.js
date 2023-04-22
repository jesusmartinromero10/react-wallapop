import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setAuthorizationHeader } from './api/client';
import storage from './utils/storage';

const accessToken = storage.get('auth'); //leemos al inicir o refrescar la pagina si hay token o no en el local storage
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App isInitiallyLogged={!!accessToken} />
  </React.StrictMode>,
);
