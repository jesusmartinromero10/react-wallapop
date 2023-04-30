import client from './client';

const advertURL = '/api/v1/adverts';

export const getAdvert = id => {
  const url = `${advertURL}/${id}`;
  return client.get(url);
};

export const deleteAdvert = async id => {
  const url = `${advertURL}/${id}`;
  return await client.delete(url);
};
