import Button from './button';

function LoginPage({
  children,
  placeholderEmail,
  placeholderPassword,
  onClick,
}) {
  return (
    <form className="loginPage" onSubmit={onClick}>
      <input type="email" placeholder={placeholderEmail} />
      <input type="password" placeholder={placeholderPassword} />
      <Button type="submit">{children}</Button>
    </form>
  );
}

export default LoginPage;
