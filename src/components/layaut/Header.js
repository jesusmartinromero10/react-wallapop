import { logout } from '../../api/servicesLogin';
import Button from '../button';

const Header = ({ isLogged, onLogout }) => {
  const handleClickLogout = async () => {
    await logout();
    onLogout();
  };
  return (
    <header>
      <nav>
        {isLogged ? (
          <Button onClick={handleClickLogout}>Logout</Button>
        ) : (
          <Button>Loginnnnn</Button>
        )}
      </nav>
      <div></div>
    </header>
  );
};
export default Header;
