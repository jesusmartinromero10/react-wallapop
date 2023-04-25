import { Link, Navigate, NavLink } from 'react-router-dom';
import { logout } from '../../api/servicesLogin';
import Button from '../button';
import '../../styles/header.css';

const Header = ({ isLogged, onLogout }) => {
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
