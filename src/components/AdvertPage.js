import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getAdvert } from '../api/servicesAdvert';
import { Spinner } from '../spinner/Spinner';
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

  return (
    <Layout title="Advertisement Page">
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          <li>{`Nombre: ${advert.name}`}</li>
          <li>Precio: {advert.price}</li>
          <li>Venta: {!!advert.sale ? 'Venta' : 'Compra'}</li>
          <li>Tags: {advert.tags}</li>
          <li>
            Fotografía: <img src={advert.photo} alt="fotografía"></img>
          </li>
        </ul>
      )}
    </Layout>
  );
};
export default AdvertPage;
