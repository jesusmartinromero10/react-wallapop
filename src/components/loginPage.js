import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/servicesLogin';
import { AuthContext } from '../context/context';
import Button from './button';

function LoginPage({ children, placeholderEmail, placeholderPassword }) {
  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true); //saber si esta cargando la llamada
    try {
      await login(credential, checked);
    } catch (error) {
      setIsLoading(false);
      setError(error);

      return;
    }
    setIsLoading(false);
    //leguearse
    onLogin();
    //redirect to pathname
    const to = location.state?.from?.pathname || '/'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
    navigate(to); //con las interrogaciones es por si viene esos estados vacios para que no de error pues si vienen vacio vas a /
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
    <div>
      <form className="loginPage" onSubmit={handleSubmit}>
        <h1>Log in Page Advertisement</h1>
        <input
          type="email"
          name="email"
          placeholder={placeholderEmail}
          onChange={handleChange}
          value={credential.email} //con esto controlamos lo que se muestra en los input en el estado
        />
        <input
          type="password"
          name="password"
          placeholder={placeholderPassword}
          onChange={handleChange}
          value={credential.password}
        />
        <Button type="submit" disabled={disableButton}>
          {children}
        </Button>
        <input type="checkbox" checked={checked} onChange={handleChecked} />
        <label>Marca para guardar credenciales</label>
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
