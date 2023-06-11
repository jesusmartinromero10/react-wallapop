import { ADVERT_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from './types';

//creamos el estado que va a tener por defecto
export const defoultState = {
  auth: false,
  adverts: [],
};

//creamos la funcion reducer

// export function reducer(state = defoultState, action) {
//   switch (action.type) {
//     case AUTH_LOGIN:
//       return { ...state, auth: true }; //clonamos el estado y le cambiamos la autenticacion a true o false si esta o no logeado
//     case AUTH_LOGOUT:
//       return { ...state, auth: false };
//     case ADVERT_LOADED:
//       return { ...state, adverts: action.payload }; //cogemos el payload de la accion que nos llega que seria la lista de anuncios

//     default:
//       return state;
//   }
// }

export function auth(state = defoultState.auth, action) {
  //esta parte del reducer solo tiene en cuenta la paerte de auth
  switch (action.type) {
    case AUTH_LOGIN:
      return true; //clonamos el estado y le cambiamos la autenticacion a true o false si esta o no logeado
    case AUTH_LOGOUT:
      return false;

    default:
      return state;
  }
}

export function adverts(state = defoultState.adverts, action) {
  switch (action.type) {
    case ADVERT_LOADED:
      return action.payload; //cogemos el payload de la accion que nos llega que seria la lista de anuncios
    default:
      return state;
  }
}

export default function combinedReducer(state = defoultState, action) {
  return {
    auth: auth(state.auth, state),
    adverts: adverts(state.adverts, action),
  };
}
