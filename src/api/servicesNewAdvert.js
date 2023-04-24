import client from './client';

export const CreateNewAdvert = datas => {
  return client.post('/api/v1/adverts', datas, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
