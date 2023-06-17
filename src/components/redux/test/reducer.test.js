import {
  addAdvertsSuccess,
  advertCreateFailure,
  advertCreateSuccess,
  authLoginFailure,
  authLoginSuccess,
} from '../actions';
import { adverts, auth, defoultState, ui } from '../reducer';

describe('Testing React Redux Reducer', () => {
  describe('"auth" division reducer test', () => {
    const stateAuth = defoultState.auth;

    it('should manage "AUTH_LOGIN_SUCCESS" action', () => {
      const action = authLoginSuccess();
      expect(auth(stateAuth, action)).toBe(true);
    });

    it('should manage "AUTH_LOGIN_FAILURE" action', () => {
      const action = authLoginFailure();
      expect(auth(stateAuth, action)).toBe(false);
    });
  });

  describe('"adverts" part reducer test', () => {
    const stateAdverts = defoultState.adverts;

    it('should manage "ADDADVERTSSUCCESS" action', () => {
      const advertsArray = [{}, {}];
      const action = addAdvertsSuccess(advertsArray);
      expect(adverts(stateAdverts, action)).toEqual({
        areLoaded: true,
        data: advertsArray,
      });
    });

    it('"ADVERTCREATEFAILURE" action', () => {
      const stateUi = defoultState.ui;
      const error = 'error';
      const action = advertCreateFailure(error);
      expect(ui(stateUi, action)).toEqual({
        isLoading: false,
        error: error,
      });
    });

    it('"ADVERTCREATEDSUCCESS" action', () => {
      const advert = { advert: 'advert' };
      const action = advertCreateSuccess(advert);
      expect(adverts(stateAdverts, action)).toEqual({
        ...stateAdverts,
        data: [advert, ...stateAdverts.data],
      });
    });
  });
});
