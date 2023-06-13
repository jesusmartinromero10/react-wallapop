//creamos las action creation

import {
  ADD_ADVERTS_FAILURE,
  ADD_ADVERTS_REQUEST,
  ADD_ADVERTS_SUCCESS,
  ADVERT_LOADED,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from './types';

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  //crea la accion de type authlogin para saber si esta loguedo
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
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

export const getApiAdverts =
  () =>
  async (dispatch, _getState, { api: { services } }) => {
    dispatch(addAdvertsRequire());
    try {
      const adverts = await services.getAdverts();
      dispatch(addAdvertsSuccess(adverts));
    } catch (error) {
      dispatch(addAdvertsFailure(error));
    }
  };

export const addAdvertsRequire = () => ({
  type: ADD_ADVERTS_REQUEST,
});

export const addAdvertsSuccess = adverts => ({
  type: ADD_ADVERTS_SUCCESS,
  payload: adverts,
});

export const addAdvertsFailure = error => ({
  type: ADD_ADVERTS_FAILURE,
  error: true,
  payload: error,
});
