import { Link, NavLink } from 'react-router-dom';
import Button from '../button';
import '../../styles/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, authLogout } from '../redux/actions';
import { getIsLogged } from '../redux/selectors';

const Header = () => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const onLogout = () => dispatch(authLogout());

  return (
    <header className="header">
      <nav>
        <NavLink to="/adverts/new">New Advertisement</NavLink> |||
        <NavLink to="/adverts" end>
          {' '}
          Read Advertisement
        </NavLink>
        {isLogged ? (
          <Button onClick={onLogout}>Logout</Button>
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
