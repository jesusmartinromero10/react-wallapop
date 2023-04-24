import { useState } from 'react';
import { CreateNewAdvert } from '../api/servicesNewAdvert';
import Button from './button';
import Layout from './layaut/Layout';

const NewAdvertPage = () => {
  const [name, setName] = useState('');
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);

  const handleSubmitNewPage = async event => {
    event.preventDefault();
    console.log(event.target.photo.files[0]);
    await CreateNewAdvert({
      name: event.target.name.value,
      sale: event.target.sale.value,
      price: event.target.price.value,
      tags: event.target.tags.value,
      photo: event.target.photo.files[0],
    });
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
    setData({ ...data, sale: event.target.value });
  };
  const handlechangePice = event => {
    setData({ ...data, price: event.target.value });
  };

  const handleChangeTags = event => {
    setData({ ...data, tags: event.target.value });
  };

  const handleChangePhoto = event => {
    console.log(event.target.files[0]);
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
