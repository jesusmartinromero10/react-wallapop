import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../api/servicesLogin';
import Button from '../button';
import '../../styles/header.css';
import { AuthContext } from '../../context/context';
import { useContext } from 'react';

const Header = () => {
  const { isLogged, onLogout } = useContext(AuthContext);
  const handleClickLogout = async () => {
    await logout();
    onLogout();
  };
  return (
    <header className="header">
      <nav>
        <NavLink to="/adverts/new">New Advertisement</NavLink> |||
        <NavLink to="/adverts" end>
          {' '}
          Read Advertisement
        </NavLink>
        {isLogged ? (
          <Button onClick={handleClickLogout}>Logout</Button>
        ) : (
          <Button as={Link} to="/login">
            Login
          </Button>
        )}
      </nav>
      <div></div>
    </header>
  );
};
export default Header;
