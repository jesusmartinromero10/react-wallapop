import { Button } from './button';

function LoginPage({ children, placeholderEmail, placeholderPassword }) {
  return (
    <form className="loginPage">
      <input type="email" placeholder={placeholderEmail} />
      <input type="password" placeholder={placeholderPassword} />
      <Button type="submit">{children}</Button>
    </form>
  );
}

export default LoginPage;
