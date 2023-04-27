import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAdvert } from '../api/services';

import Layout from './layaut/Layout';

function AdvertsPage() {
  //const handlerClick = async () => {
  //await logout();
  //onLogout();
  //};
  const navigate = useNavigate();
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getAllAdvert()
      .then(adverts => setAdverts(adverts))
      .catch(error => {
        if (error.response.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate]);

  return (
    <Layout title="Adverts Page">
      <div>
        {!!adverts.length ? (
          <>
            <ul>
              {adverts.map(advert => (
                <li key={advert.id}>
                  <Link to={`/adverts/${advert.id}`}>
                    <br></br>
                    Nombre:{advert.name}
                    <br></br>
                    Venta:{advert.sale}
                    <br></br>
                    Precio:{advert.price}
                    <br></br>
                    Tags:{advert.tags}
                    <br></br>
                    Foto:
                    <img src={advert.photo} alt="Fotografia" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No hay mensajes publicados, crea uno por favor</p>
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
