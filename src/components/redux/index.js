//aqui creamos el store de redux

import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from './reducer';
import * as actionCreators from './actions';

const composeEnhancers = composeWithDevTools({
  //configuracion devtools
  actionCreators,
});

export default function configureStore() {
  //para importar desde fuera y decidir desde fuera como crear el store como nos covenga mas
  const store = createStore(
    reducer,
    composeEnhancers(), //para que funcione las devtools de redux
  );
  return store;
}
