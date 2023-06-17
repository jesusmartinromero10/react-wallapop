//creamos las action creation

import { getAdvert } from '../../api/servicesAdvert';
import { areAdvertsLoaded, getReduxAdvert } from './selectors';
import {
  ADD_ADVERTS_FAILURE,
  ADD_ADVERTS_REQUEST,
  ADD_ADVERTS_SUCCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_FAILURE,
  ADVERT_DELETED_REQUEST,
  ADVERT_DELETED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
  ADVER_LOADED_FAILURE,
  ADVER_LOADED_REQUEST,
  ADVER_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TAGS_FAILURE,
  TAGS_REQUEST,
  TAGS_SUCCESS,
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
  async (dispatch, getState, { api }) => {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getAllAdvert();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };

export const advertLoadedRequest = () => ({
  //crea la accion de pedida de anuncios
  type: ADVER_LOADED_REQUEST,
});

export const advertLoadedSuccess = advert => ({
  //crea la accion de la carga de anuncio
  type: ADVER_LOADED_SUCCESS,
  payload: advert, //le pasamos el anuncio para que los pueda leer
});

export const advertLoadedFailure = error => ({
  //crea la accion de error de la carga de anuncios
  type: ADVER_LOADED_FAILURE,
  error: true,
  payload: error, //le pasamos el error para que los pueda leer
});

export const advertLoad =
  id =>
  async (dispatch, getState, { api, router }) => {
    const isLoaded = getReduxAdvert(id)(getState());
    if (isLoaded) {
      return;
    }
    dispatch(advertLoadedRequest());
    try {
      const advert = await api.adverts.getAdvert(id);
      dispatch(advertLoadedSuccess(advert));
    } catch (error) {
      dispatch(advertLoadedFailure(error));
      if (error.response.status === 404) {
        return router.navigate('/404');
      }
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
  async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginRequest()); //saber si esta cargando la llamada
    try {
      await api.auth.login(credential, checked);
    } catch (error) {
      dispatch(authLoginFailure(error));

      return;
    }
    //leguearse
    dispatch(authLoginSuccess());
    const to = router.state?.from?.pathname || '/'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
    router.navigate(to);
  };

export const advertCreateRequest = () => ({
  type: ADVERT_CREATED_REQUEST,
});

export const advertCreateSuccess = advert => ({
  type: ADVERT_CREATED_SUCCESS,
  payload: advert,
});

export const advertCreateFailure = error => ({
  type: ADVERT_CREATED_FAILURE,
  error: true,
  payload: error,
});

export const advertCreated =
  advert =>
  async (dispatch, _getState, { api, router }) => {
    dispatch(advertCreateRequest());
    try {
      const createAdvert = await api.newAdvert.CreateNewAdvert(advert);
      dispatch(advertCreateSuccess(createAdvert));
      router.navigate('/');
      return createAdvert;
    } catch (error) {
      dispatch(advertCreateFailure(error));
      error.response?.status === 400
        ? router.navigate('/login')
        : router.navigate('/');
    }
  };

export const advertDeleteRequest = () => ({
  type: ADVERT_DELETED_REQUEST,
});

export const advertDeleteSuccess = id => ({
  type: ADVERT_DELETED_SUCCESS,
  payload: id,
});

export const advertDeleteFailure = error => ({
  type: ADVERT_DELETED_FAILURE,
  error: true,
  payload: error,
});

export const deleteAdvertId =
  id =>
  async (dispatch, _getState, { api: { adverts }, router }) => {
    dispatch(advertDeleteRequest());
    try {
      await adverts.deleteAdvert(id);

      dispatch(advertDeleteSuccess(id));
      alert('Anuncio borrado correctamente');
      router.navigate('/');
    } catch (error) {
      dispatch(advertDeleteFailure(error));
      console.log(error);
      error.response?.status === 404
        ? router.navigate('/404')
        : router.navigate('/');
    }
  };

export const getTagsApi =
  () =>
  async (dispatch, _getState, { api: { adverts } }) => {
    dispatch(tagRequire());
    try {
      const tags = await adverts.getTags();
      console.log('tagas', tags);
      dispatch(tagSuccess(tags));
    } catch (error) {
      dispatch(tagFailure(error));
    }
  };

export const tagRequire = () => ({
  type: TAGS_REQUEST,
});

export const tagSuccess = tags => ({
  type: TAGS_SUCCESS,
  payload: tags,
});

export const tagFailure = error => ({
  type: TAGS_FAILURE,
  payload: error,
  error: true,
});
