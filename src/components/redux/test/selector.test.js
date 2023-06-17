import { getAdverts, getReduxAdvert } from '../selectors';

describe('Testing React Redux selectors', () => {
  const advert = {
    id: 1,
    name: 'advert 1',
  };
  // const advert2 = {
  // 	id: 2,
  // 	name: "advert 2"
  // };

  const array = [advert];

  const state = {
    auth: false,
    adverts: {
      areLoaded: false,
      data: array,
    },
  };
  describe('test "getAdverts" selector', () => {
    it('should return an array with advert objects', () => {
      expect(getAdverts(state)).toEqual(array);
    });
  });

  describe('test "getReduxAdvert" selector', () => {
    it('should return the advert object with the specify id', () => {
      expect(getReduxAdvert(1)(state)).toEqual(advert);
    });
  });
});
