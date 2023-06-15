import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setAuthorizationHeader } from './api/client';
import configureStore from './components/redux';
import storage from './utils/storage';
import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';

const accessToken = storage.get('auth'); //leemos al inicir o refrescar la pagina si hay token o no en el local storage
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);
const store = configureStore({ auth: !!accessToken }, { router }); //creamos el store y ya disponemos de dispatch, getState...

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root store={store} router={router} />
  </React.StrictMode>,
);
