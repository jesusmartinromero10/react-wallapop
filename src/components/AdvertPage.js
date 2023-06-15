import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteAdvert, getAdvert } from '../api/servicesAdvert';
import { Spinner } from '../spinner/Spinner';
import Button from './button';
import Layout from './layaut/Layout';
import '../styles/styleAdvertPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxAdvert } from './redux/selectors';
import { advertLoad } from './redux/actions';

const AdvertPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const advert = useSelector(getReduxAdvert(params.id));

  const [_advert, setAdvert] = useState([]);

  useEffect(() => {
    //setIsLoading(true);
    //dispatch(advertLoad(params.id));

    dispatch(advertLoad(params.id))
      //.then(advert => setAdvert(advert))
      .then(() => setIsLoading(false))
      .catch(error => {
        if (error.response.status === 404) {
          return navigate('/404');
        }
        setError(error);
      });
  }, [params.id, navigate, dispatch]);

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
        <div className="advertPage">
          <ul className="ulAdvertPage">
            <li className="liName">{`Nombre: ${advert.name}`}</li>
            <li className="liPrice">Precio: {advert.price}</li>
            <li className="liSale">
              Venta: {!!advert.sale ? 'Venta' : 'Compra'}
            </li>
            <li className="liTag">Tags: {advert.tags}</li>
            <li className="liPhoto">
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
