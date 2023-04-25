import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllAdvert } from '../api/services';
import { logout } from '../api/servicesLogin';
import Button from './button';
import Layout from './layaut/Layout';

function AdvertsPage(props) {
  //const handlerClick = async () => {
  //await logout();
  //onLogout();
  //};

  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getAllAdvert().then(adverts => setAdverts(adverts));
  }, []);

  return (
    <Layout title="Adverts Page" {...props}>
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
