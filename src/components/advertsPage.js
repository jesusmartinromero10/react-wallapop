import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAdvert } from '../api/services';
import { Spinner } from '../spinner/Spinner';
import Button from './button';

import Layout from './layaut/Layout';

function AdvertsPage() {
  const [data, setData] = useState({
    sales: '',
    buy: '',
    priceMin: 0,
    priceMax: Infinity,
  });
  const navigate = useNavigate();
  const [adverts, setAdverts] = useState([]);
  const [advertFilter, setAdvertFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllAdvert()
      .then(adverts => setAdverts(adverts))
      .then(() => setIsLoading(false))
      .catch(error => {
        if (error.response.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate]);
  useEffect(() => {
    setIsLoading(true);
    getAllAdvert()
      .then(adverts => setAdvertFilter(adverts))
      .then(() => setIsLoading(false))
      .catch(error => {
        if (error.response.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate]);
  const [checked, setCheked] = useState(null);

  const handleClickFilter = event => {
    event.preventDefault();

    const state = () => {
      let resultSale = '';

      if (data.sales) {
        resultSale = true;
      } else if (data.buy) {
        resultSale = false;
      }
      return resultSale;
    };
    if (state() === true || state() === false) {
      let filterPrice = advertFilter.filter(
        advert =>
          advert.price >= data.priceMin &&
          advert.price <= data.priceMax &&
          advert.sale === state(),
      );

      setAdverts(filterPrice);
    } else {
      let filterPrice = advertFilter.filter(
        advert =>
          advert.price >= data.priceMin && advert.price <= data.priceMax,
      );

      setAdverts(filterPrice);
    }
  };

  const handleChangeFilterSaleCheck = event => {
    event.target.name === 'sales'
      ? setData({ ...data, sales: event.target.checked })
      : setData({ ...data, buy: event.target.checked });
  };
  const handleChangeFilterPriceMax = event => {
    setData({ ...data, priceMax: event.target.value });
  };

  const handleChangeFilterPriceMin = event => {
    setData({ ...data, priceMin: event.target.value });
  };
  const disabledCheckBuy = data.sales;
  const disabledCheckSale = data.buy;

  return (
    <Layout title="Adverts Page">
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <form className="formAdversPage">
            <label>Compra</label>
            <input
              className="inputBuyAdvertsPage"
              type="checkbox"
              name="buy"
              checked={checked}
              onChange={handleChangeFilterSaleCheck}
              disabled={disabledCheckBuy}
            />
            <label>Venta</label>
            <input
              className="inputSaleAdvertsPage"
              type="checkbox"
              name="sales"
              checked={checked}
              onChange={handleChangeFilterSaleCheck}
              disabled={disabledCheckSale}
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
        )}
        {!!adverts.length ? (
          <>
            <ul>
              {adverts.map(advert => (
                <li key={advert.id}>
                  <Link to={`/adverts/${advert.id}`}>
                    <br></br>
                    Nombre:{advert.name}
                    <br></br>
                    Venta:{!!advert.sale ? 'Venta' : 'Compra'}
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
