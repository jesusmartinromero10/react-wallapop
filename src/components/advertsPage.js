import React, { useEffect, useState } from 'react';
import { getAllAdvert } from '../api/services';
import { logout } from '../api/servicesLogin';
import Button from './button';
import Layout from './layaut/Layout';

function AdvertsPage({ onLogout }) {
  const handlerClick = async () => {
    await logout();
    onLogout();
  };

  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    const response = getAllAdvert().then(adverts => setAdverts(adverts));
    console.log(response);
  }, []);

  return (
    <Layout title="Adverts Page">
      <div>
        <ul>
          {adverts.map(advert => (
            <>
              <li key={advert.id}>
                Nombre:{advert.name}
                Venta:{advert.sale}
                Precio:{advert.price}
                Tags:{advert.tags}
                Foto:
                <img src={advert.photo} alt="Fotografia" />
              </li>
            </>
          ))}
        </ul>
        <Button onClick={handlerClick}>Logout</Button>
      </div>
    </Layout>
  );
}

export default AdvertsPage;
