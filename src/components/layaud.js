import React from 'react';

function Layaud() {
  const anuncios = [
    { nombre: 'barco', precio: '20000', venta: 'true ' },
    { nombre: 'perro', precio: '50000', venta: 'false' },
  ];

  const listanuncios = anuncios.map(e => {
    return (
      <div key={e.nombre}>
        <p>Nombre: {e.nombre}</p>
        <p>Precio: {e.precio}</p>
        <p>Estado: {e.venta}</p>
      </div>
    );
  });
  console.log('list', listanuncios);
  return <div>{listanuncios}</div>;
}

export default Layaud;
