//aqui creamos el store de redux

import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
//import { auth, adverts } from './reducer';
import * as reducers from './reducer';
import * as actionCreators from './actions';

// const reducer = combineReducers({
//   auth,
//   adverts,
// });

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  //configuracion devtools
  actionCreators,
});

export default function configureStore(preloadedState) {
  //para importar desde fuera y decidir desde fuera como crear el store como nos covenga mas
  const store = createStore(
    reducer,
    preloadedState, //aqui le pasamos si hay token o no de principio
    composeEnhancers(), //para que funcione las devtools de redux
  );
  return store;
}
