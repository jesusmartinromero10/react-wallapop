import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/servicesLogin';
import Button from './button';

function LoginPage({
  children,
  placeholderEmail,
  placeholderPassword,
  setIsLogged,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async event => {
    event.preventDefault();
    await login(credential, checked);
    //leguearse
    setIsLogged();
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

  const disableButton = !credential.email || !credential.password;

  const [checked, setCheked] = useState(false);
  const handleChecked = event => {
    setCheked(event.target.checked);
  };
  return (
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
  );
}

export default LoginPage;
