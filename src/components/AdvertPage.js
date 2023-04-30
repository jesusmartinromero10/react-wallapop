import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteAdvert, getAdvert } from '../api/servicesAdvert';
import { Spinner } from '../spinner/Spinner';
import Button from './button';
import Layout from './layaut/Layout';

const AdvertPage = () => {
  const [advert, setAdvert] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAdvert(params.id)
      .then(advert => setAdvert(advert))
      .then(() => setIsLoading(false))
      .catch(error => {
        if (error.response.status === 404) {
          return navigate('/404');
        }
        setError(error);
      });
  }, [params.id, navigate]);

  const handleSubmitDelete = event => {
    deleteAdvert(params.id)
      .then(navigate('/'))
      .catch(error => {
        if (error.response.status === 404) {
          return navigate('/404');
        }
        setError(error);
      });
  };

  return (
    <Layout title="Advertisement Page">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ul>
            <li>{`Nombre: ${advert.name}`}</li>
            <li>Precio: {advert.price}</li>
            <li>Venta: {!!advert.sale ? 'Venta' : 'Compra'}</li>
            <li>Tags: {advert.tags}</li>
            <li>
              Fotografía: <img src={advert.photo} alt="fotografía"></img>
            </li>
          </ul>
          <Button onClick={handleSubmitDelete}>Borrar</Button>
          <div>{error}</div>
        </div>
      )}
    </Layout>
  );
};
export default AdvertPage;
