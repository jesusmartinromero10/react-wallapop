//creamos las action creation

import { areAdvertsLoaded } from './selectors';
import {
  ADD_ADVERTS_FAILURE,
  ADD_ADVERTS_REQUEST,
  ADD_ADVERTS_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
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

export const advertsLoadedRequest = () => ({
  //crea la accion de pedida de anuncios
  type: ADVERT_LOADED_REQUEST,
});

export const advertsLoadedSuccess = adverts => ({
  //crea la accion de la carga de anuncios
  type: ADVERT_LOADED_SUCCESS,
  payload: adverts, //le pasamos la lista de anuncios para que los pueda leer
});

export const advertsLoadedFailure = error => ({
  //crea la accion de error de la carga de anuncios
  type: ADVERT_LOADED_FAILURE,
  error: true,
  payload: error, //le pasamos el error para que los pueda leer
});

export const advertsLoaded =
  () =>
  async (dispatch, getState, { adverts: advertsService }) => {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await advertsService.getAllAdvert();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };

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

export const authlogin = (credential, checked) =>
  async function (dispatch, _getState, { auth }) {
    dispatch(authLoginRequest()); //saber si esta cargando la llamada
    try {
      await auth.login(credential, checked);
    } catch (error) {
      dispatch(authLoginFailure(error));

      return;
    }
    //leguearse
    dispatch(authLoginSuccess());
  };
