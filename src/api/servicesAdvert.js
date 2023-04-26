import client from './client';

const advertURL = '/api/v1/adverts';

export const getAdvert = id => {
  const url = `${advertURL}/${id}`;
  return client.get(url);
};
