import { useState } from 'react';

import Button from './button';
import '../styles/styleLogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { authlogin } from './redux/actions';
import { getUi } from './redux/selectors';

function LoginPage({ children, placeholderEmail, placeholderPassword }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  //const onLogin = () => dispatch(authLoginSuccess()); //despachamos la accion de loguearse
  const handleSubmit = async event => {
    event.preventDefault();
    await dispatch(authlogin(credential, checked));

    //redirect to pathname
    // const to = location.state?.from?.pathname || '/'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
    // navigate(to); //con las interrogaciones es por si viene esos estados vacios para que no de error pues si vienen vacio vas a /
  };
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });
  const handleChange = event => {
    if (event.target.name === 'email') {
      setCredential({ ...credential, email: event.target.value }); //con esto vemos si escribe en los imput o no
    }
    if (event.target.name === 'password') {
      setCredential({ ...credential, password: event.target.value });
    }
  };

  const disableButton = !credential.email || !credential.password || isLoading;

  const [checked, setCheked] = useState(false);
  const handleChecked = event => {
    setCheked(event.target.checked);
  };
  return (
    <div className="container-login">
      <form className="form-login" onSubmit={handleSubmit}>
        <h1 className="h1-login">Log in Page Advertisement</h1>
        <input
          className="input-login-email"
          type="email"
          name="email"
          placeholder={placeholderEmail}
          onChange={handleChange}
          value={credential.email} //con esto controlamos lo que se muestra en los input en el estado
        />
        <input
          className="input-login-password"
          type="password"
          name="password"
          placeholder={placeholderPassword}
          onChange={handleChange}
          value={credential.password}
        />
        <Button type="submit" disabled={disableButton}>
          {children}
        </Button>
        <input
          className="input-login-check"
          type="checkbox"
          checked={checked}
          onChange={handleChecked}
        />
        <span>Marca para guardar credenciales</span>
      </form>
      {error &&
        (error.response ? (
          <div className="loging-error">
            {error.response.data.message} usuario o contraseña incorrecta
          </div>
        ) : (
          <div>{error.message} Comprueba la conexion de la red</div>
        ))}
    </div>
  );
}

export default LoginPage;
