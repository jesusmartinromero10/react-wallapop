import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateNewAdvert } from '../api/servicesNewAdvert';
import Button from './button';
import Layout from './layaut/Layout';

const NewAdvertPage = () => {
  const [sale, setSale] = useState('');
  const navigate = useNavigate();
  const handleSubmitNewPage = async event => {
    event.preventDefault();

    console.log(event.target.sale.value);
    await CreateNewAdvert({
      name: event.target.name.value,
      sale: sale ? false : true,
      price: event.target.price.value,
      tags: event.target.tags.value,
      photo: event.target.photo.files[0],
    });
    console.log('sale', sale);
    navigate('/');
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
        <h1>Create New Advert Page</h1>
        <label
          className="labelNombreNewAdvert"
          name="name"
          onChange={handleChangeName}
        >
          Nombre:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Introduce nombre artículo"
          value={data.name.value}
          onChange={handleChangeName}
        />
        <label name="sale">
          Venta:
          <select name="sale" onChange={handleChangeSale}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </label>
        <label name="price">Precio de venta: </label>
        <input
          type="number"
          name="price"
          placeholder="precio de venta"
          value={data.price.value}
          onChange={handlechangePice}
        />
        <label name="tags">Tags</label>
        <select name="tags" onChange={handleChangeTags}>
          <option value="lifestyle">Lifestyle</option>
          <option value="mobile">Mobile</option>
          <option value="motor">Motor</option>
          <option value="work">Work</option>
        </select>
        <input type="file" name="photo" onChange={handleChangePhoto} />
        <Button>Crear</Button>
      </form>
    </Layout>
  );
};
export default NewAdvertPage;
