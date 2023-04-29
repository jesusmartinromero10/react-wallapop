import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/error.css';

const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = event => navigate('/');

  //return <div>Error 404 || Not Found</div>;
  return (
    <div>
      <body>
        <h1>¡Oops! La página que buscas no existe</h1>
        <p>
          Lo sentimos, la página que estás buscando no se encuentra en nuestro
          sitio web.
        </p>
        <button class="button" onClick={handleClick}>
          Volver pagina principal
        </button>
      </body>
    </div>
  );
};
export default NotFoundPage;
