import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../api/client';
import { getAdvert } from '../api/servicesAdvert';
import Layout from './layaut/Layout';

const AdvertPage = () => {
  const [advert, setAdvert] = useState([]);
  const [error, setError] = useState(null);
  console.log(advert);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAdvert(params.id)
      .then(advert => setAdvert(advert))
      .catch(error => {
        if (error.response.status === 404) {
          return navigate('/404');
        }
        setError(error);
      });
  }, [params.id, navigate]);

  return (
    <Layout title="Advertisement Page">
      <ul>
        <li>Nombre: {advert.name}</li>
        <li>Precio: {advert.price}</li>
        <li>Venta: {!!advert.sale ? 'Venta' : 'Compra'}</li>
        <li>Tags: {advert.tags}</li>
        <li>Fotografía: {advert.photo}</li>
      </ul>
    </Layout>
  );
};
export default AdvertPage;
