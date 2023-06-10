//creamos las action creation

import { ADVERT_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from './types';

export const authLogin = () => ({
  //crea la accion de type authlogin para saber si esta loguedo
  type: AUTH_LOGIN,
});

export const authLogout = () => ({
  //crea la accion de type authlogout para saber si no esta loguedo
  type: AUTH_LOGOUT,
});

export const advertsLoaded = adverts => ({
  //crea la accion de la carga de anuncios
  type: ADVERT_LOADED,
  payload: adverts, //le pasamos la lista de anuncios para que los pueda leer
});
