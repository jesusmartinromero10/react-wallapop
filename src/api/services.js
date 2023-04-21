import client from './client';

const advertURL = '/api/v1/adverts'; //trae todos los anuncios

export const getAllAdvert = () => {
  return client.get(advertURL); //hace la llamada para traer los anuncios
};
