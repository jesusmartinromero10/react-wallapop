import React from 'react';
import { logout } from '../api/servicesLogin';
import Button from './button';

function Layaud({ onLogout }) {
  const anuncios = [
    { nombre: 'barco', precio: '20000', venta: 'true ' },
    { nombre: 'perro', precio: '50000', venta: 'false' },
  ];
  const handlerClick = async () => {
    await logout();
    onLogout();
  };
  const listanuncios = anuncios.map(e => {
    return (
      <div key={e.nombre}>
        <p>Nombre: {e.nombre}</p>
        <p>Precio: {e.precio}</p>
        <p>Estado: {e.venta}</p>
      </div>
    );
  });

  return (
    <div>
      {listanuncios} <Button onClick={handlerClick}>Logout</Button>
    </div>
  );
}

export default Layaud;
