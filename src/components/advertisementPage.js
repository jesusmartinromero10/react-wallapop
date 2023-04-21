import { useEffect, useState } from 'react';
import { getAllAdvert } from '../api/services';

const AdvertisementPage = () => {
  const [advert, setAdvert] = useState([]);
  useEffect(() => {
    getAllAdvert().then(response => setAdvert(response.data));
  }, []);
  return <div>{advert}</div>;
};
export default AdvertisementPage;
