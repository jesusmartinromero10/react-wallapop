//aqui creamos el store de redux

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
//import { auth, adverts } from './reducer';
import * as reducers from './reducer';
import * as actionCreators from './actions';
import thunk from 'redux-thunk';
import * as auth from '../../api/servicesLogin';
import * as adverts from '../../api/servicesAdvert';
import * as newAdvert from '../../api/servicesNewAdvert';

// const reducer = combineReducers({
//   auth,
//   adverts,
// });

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({
  //configuracion devtools
  actionCreators,
});

export default function configureStore(preloadedState, { router }) {
  const middleware = [
    thunk.withExtraArgument({ api: { auth, adverts, newAdvert }, router }),
  ];
  //para importar desde fuera y decidir desde fuera como crear el store como nos covenga mas
  const store = createStore(
    reducer,
    preloadedState, //aqui le pasamos si hay token o no de principio
    composeEnhancers(applyMiddleware(...middleware)), //para que funcione las devtools de redux
  );
  return store;
}
