import { login } from '../api/servicesLogin';
import Button from './button';

function LoginPage({ children, placeholderEmail, placeholderPassword }) {
  const handleSubmit = async event => {
    event.preventDefault();
    await login({
      email: event.target.email.value,
      password: event.target.password.value,
    });
  };
  return (
    <form className="loginPage" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder={placeholderEmail} />
      <input
        type="password"
        name="password"
        placeholder={placeholderPassword}
      />
      <Button type="submit">{children}</Button>
      <input type="checkbox" />
      <label>Marca para guardar credenciales</label>
    </form>
  );
}

export default LoginPage;
