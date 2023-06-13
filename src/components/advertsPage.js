import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAdvert } from '../api/services';
import { Spinner } from '../spinner/Spinner';
import Button from './button';
import '../styles/styleAdvertsPage.css';
import Layout from './layaut/Layout';
import { getAdverts } from './redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsLoaded } from './redux/actions';

function AdvertsPage() {
  const [data, setData] = useState({
    sales: '',
    buy: '',
    priceMin: 0,
    priceMax: Infinity,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const advert = useSelector(getAdverts);

  const [advertFilter, setAdvertFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllAdvert()
      .then(advert => dispatch(advertsLoaded(advert)))
      .then(() => setIsLoading(false))
      .catch(error => {
        if (error.response.status === 404) {
          navigate('/404');
        }
      });
  }, [navigate, dispatch]);
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

  // const handleClickFilter = event => {
  //   event.preventDefault();

  //   const state = () => {
  //     let resultSale = '';

  //     if (data.sales) {
  //       resultSale = true;
  //     } else if (data.buy) {
  //       resultSale = false;
  //     }
  //     return resultSale;
  //   };
  //   if (state() === true || state() === false) {
  //     let filterPrice = advertFilter.filter(
  //       advert =>
  //         advert.price >= data.priceMin &&
  //         advert.price <= data.priceMax &&
  //         advert.sale === state(),
  //     );

  //     setAdverts(filterPrice);
  //   } else {
  //     let filterPrice = advertFilter.filter(
  //       advert =>
  //         advert.price >= data.priceMin && advert.price <= data.priceMax,
  //     );

  //     setAdverts(filterPrice);
  //   }
  // };

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
            <label className="labelAdvertsPage">Compra</label>
            <input
              className="inputBuyAdvertsPage"
              type="checkbox"
              name="buy"
              checked={checked}
              onChange={handleChangeFilterSaleCheck}
              disabled={disabledCheckBuy}
            />
            <label className="labelAdvertsPage">Venta</label>
            <input
              className="inputSaleAdvertsPage"
              type="checkbox"
              name="sales"
              checked={checked}
              onChange={handleChangeFilterSaleCheck}
              disabled={disabledCheckSale}
            />
            <label className="labelAdvertsPage" name="price">
              Precio Minimo
            </label>
            <input
              className="inputPriceMinAdvertsPage"
              type="number"
              pattern="filtro precio"
              name="price"
              value={data.sales.value}
              onChange={handleChangeFilterPriceMin}
              placeholder="introduzca precio minimo"
            />
            <label className="labelAdvertsPage" name="price">
              Precio Maximo
            </label>
            <input
              className="inputPriceMaxAdvertsPage"
              type="number"
              pattern="filtro precio"
              name="price"
              value={data.sales.value}
              onChange={handleChangeFilterPriceMax}
              placeholder="introduzca precio maximo"
            />
            <Button>filtrar</Button>
            {/* <Button onClick={handleClickFilter}>filtrar</Button> */}
          </form>
        )}
        {!!advert.length ? (
          <>
            <ul className="ulAdvertsPage">
              {advert.map(advert => (
                <li key={advert.id} className="liAdvertsPage">
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
          <p className="pAdvertsPage">
            No hay mensajes publicados, crea uno por favor
          </p>
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
