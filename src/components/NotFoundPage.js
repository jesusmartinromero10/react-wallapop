import { useNavigate } from 'react-router-dom';
import '../styles/error.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = event => navigate('/');

  return (
    <div className="errorPage404">
      <h1 className="h1-errorPage404">¡Oops! La página que buscas no existe</h1>
      <p className="p-errorPage404">
        Lo sentimos, la página que estás buscando no se encuentra en nuestro
        sitio web.
      </p>
      <button className="button" onClick={handleClick}>
        Volver pagina principal
      </button>
    </div>
  );
};
export default NotFoundPage;
