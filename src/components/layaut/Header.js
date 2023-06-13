import { Link, NavLink } from 'react-router-dom';
import Button from '../button';
import '../../styles/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/actions';
import { getIsLogged } from '../redux/selectors';
import { logout } from '../../api/servicesLogin';

const Header = () => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(authLogout());
    logout();
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
          <Button onClick={handlerLogout}>Logout</Button>
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
