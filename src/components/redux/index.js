//aqui creamos el store de redux

import { createStore } from 'redux';
import { reducer } from './reducer';

export default function configureStore() {
  //para importar desde fuera y decidir desde fuera como crear el store como nos covenga mas
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(), //para que funcione las devtools de redux
  );
  return store;
}
