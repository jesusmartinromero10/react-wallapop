import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateNewAdvert } from '../api/servicesNewAdvert';
import Button from './button';
import Layout from './layaut/Layout';
import '../styles/styleNewAdvert.css';
import { useDispatch, useSelector } from 'react-redux';
import { advertCreated } from './redux/actions';
import { getUi } from './redux/selectors';

const NewAdvertPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getUi);
  const [sale, setSale] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmitNewPage = async event => {
    event.preventDefault();
    try {
      await dispatch(
        advertCreated({
          name: event.target.name.value,
          sale: sale ? false : true,
          price: event.target.price.value,
          tags: event.target.tags.value,
          photo: event.target.photo.files[0],
        }),
      );

      navigate('/');
    } catch (error) {
      error.response?.status === 400
        ? setError(`Introduzca algun dato para crear el anuncio`)
        : setError('Compruebe conexion internet');
    }
  };
  const [data, setData] = useState({
    name: '',
    sale: '',
    price: '',
    tags: '',
    photo: '',
  });
  const handleChangeName = event => {
    setData({ ...data, name: event.target.value });
  };

  const handleChangeSale = event => {
    setSale(event.target.value);
    setData({ ...data, sale: event.target.value });
  };
  const handlechangePice = event => {
    setData({ ...data, price: event.target.value });
  };

  const handleChangeTags = event => {
    setData({ ...data, tags: event.target.value });
  };

  const handleChangePhoto = event => {
    setData({ ...data, photo: event.target.files[0] });
  };

  return (
    <Layout title="Wallapop">
      <form className="formNewAdvert" onSubmit={handleSubmitNewPage}>
        <h1 className="h1-newAdvert">Create New Advert Page</h1>
        <label
          className="labelNewAdvert"
          name="name"
          onChange={handleChangeName}
        >
          Nombre
        </label>
        <input
          className="inputNameNewAdvert"
          type="text"
          name="name"
          placeholder="Introduce nombre artículo"
          value={data.name.value}
          onChange={handleChangeName}
          required
        />
        <label name="sale" className="labelNewAdvert">
          Venta
          <select
            name="sale"
            onChange={handleChangeSale}
            className="inputSaleNewAdvert"
          >
            <option value={true}>Vender</option>
            <option value={false}>Comprar</option>
          </select>
        </label>
        <label name="price" className="labelNewAdvert">
          Precio de venta:{' '}
        </label>
        <input
          type="number"
          className="inputPriceNewAdvert"
          name="price"
          placeholder="precio de venta"
          value={data.price.value}
          onChange={handlechangePice}
          required
        />
        <label name="tags" className="labelNewAdvert">
          Tags
        </label>
        <select
          name="tags"
          onChange={handleChangeTags}
          required
          className="inputTagsNewAdvert"
        >
          <option value="lifestyle">Lifestyle</option>
          <option value="mobile">Mobile</option>
          <option value="motor">Motor</option>
          <option value="work">Work</option>
        </select>
        <label name="photo" className="labelNewAdvert">
          Elige una fotografía
        </label>
        <input
          type="file"
          name="photo"
          onChange={handleChangePhoto}
          className="inputPhotoNewAdvert"
        />
        <Button>Crear</Button>
        <div>{error}</div>
      </form>
    </Layout>
  );
};
export default NewAdvertPage;
