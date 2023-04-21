import { useState } from 'react';
import { login } from '../api/servicesLogin';
import Button from './button';

function LoginPage({
  children,
  placeholderEmail,
  placeholderPassword,
  setIsLogged,
}) {
  const handleSubmit = async event => {
    event.preventDefault();
    await login({
      email: event.target.email.value,
      password: event.target.password.value,
    });
    setIsLogged();
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
  return (
    <form className="loginPage" onSubmit={handleSubmit}>
      <h1>Log in Page Advertisement</h1>
      <input
        type="email"
        name="email"
        placeholder={placeholderEmail}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder={placeholderPassword}
        onChange={handleChange}
      />
      <Button type="submit">{children}</Button>
      <input type="checkbox" />
      <label>Marca para guardar credenciales</label>
    </form>
  );
}

export default LoginPage;
