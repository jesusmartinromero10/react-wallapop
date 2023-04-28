import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAdvert } from '../api/services';
import Button from './button';

import Layout from './layaut/Layout';

function AdvertsPage() {
  //const handlerClick = async () => {
  //await logout();
  //onLogout();
  //};
  const [data, setData] = useState({
    sales: '',
    priceMin: 0,
    priceMax: Infinity,
  });
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

  const handleClickFilter = event => {
    event.preventDefault();
    let filterPrice = adverts.filter(
      advert => advert.price >= data.priceMin && advert.price <= data.priceMax,
    );

    setAdverts(filterPrice);

    //const res=adverts.price.filter(advert => console.log(advert))
    //console.log(res)
  };

  const handleChangeFilterSale = event => {
    setData({ ...data, sales: event.target.value });
  };
  const handleChangeFilterPriceMax = event => {
    setData({ ...data, priceMax: event.target.value });
    //console.log(adverts[0].price)
  };

  const handleChangeFilterPriceMin = event => {
    setData({ ...data, priceMin: event.target.value });
  };

  return (
    <Layout title="Adverts Page">
      <div>
        <form>
          <input
            type="text"
            placeholder="filtro venta"
            name="sales"
            value={data.sales.value}
            onChange={handleChangeFilterSale}
          />
          <input
            type="number"
            pattern="filtro precio"
            name="price"
            value={data.sales.value}
            onChange={handleChangeFilterPriceMin}
          />
          <input
            type="number"
            pattern="filtro precio"
            name="price"
            value={data.sales.value}
            onChange={handleChangeFilterPriceMax}
          />
          <Button onClick={handleClickFilter}>filtrar</Button>
        </form>
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
