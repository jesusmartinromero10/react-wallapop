import {
  addAdvertsFailure,
  addAdvertsRequire,
  addAdvertsSuccess,
  authlogin,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
  getApiAdverts,
} from '../actions';
import { ADD_ADVERTS_SUCCESS, AUTH_LOGIN_FAILURE } from '../types';

describe('testing React Redux actions', () => {
  describe('testing SYNC actions', () => {
    describe('testing "addAdvertsSuccess" sync action', () => {
      it('should return action object with "ADD_ADVERTS_SUCCESS" type', () => {
        const adverts = 'adverts';
        const action = {
          type: ADD_ADVERTS_SUCCESS,
          payload: adverts,
        };
        expect(addAdvertsSuccess(adverts)).toEqual(action);
      });
    });

    describe('testing "loginFailure" sync action', () => {
      it('should return action object with "LOGIN_FAILURE" type', () => {
        const errorPayloadValue = 'error';
        const action = {
          type: AUTH_LOGIN_FAILURE,
          error: true,
          payload: errorPayloadValue,
        };
        expect(authLoginFailure(errorPayloadValue)).toEqual(action);
      });
    });
  });

  describe('testing ASYNC actions', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const auth = {};
    const services = {};

    describe('"authLogin" async action tests', () => {
      const credentials = 'credentials';
      const isChecked = 'isChecked';
      const redirectURL = '/';

      const action = authlogin(credentials, isChecked);

      const router = {
        navigate: jest.fn(),
        state: { location: { state: { from: { pathname: redirectURL } } } },
      };

      it('should follow the flow upon successful login', async () => {
        auth.login = jest.fn().mockResolvedValue();
        await action(dispatch, getState, { api: { auth }, router });
        expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
        expect(auth.login).toHaveBeenCalledWith(credentials, isChecked);
        expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
        expect(router.navigate).toHaveBeenCalledWith(redirectURL);
      });

      it('Should follow the flow upon login failure', async () => {
        const error = new Error('unauthorized');
        auth.login = jest.fn().mockRejectedValue(error);
        await action(dispatch, getState, { api: { auth }, router });
        expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
        expect(auth.login).toHaveBeenCalledWith(credentials, isChecked);
        expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
      });
    });

    describe('"getApiAdverts" async action tests', () => {
      const action = getApiAdverts();

      it('Should follow the flow upon successfully retrieving ads', async () => {
        const adverts = 'adverts';
        services.getAdverts = jest.fn().mockResolvedValue(adverts);
        await action(dispatch, getState, { api: { services } });
        expect(dispatch).toHaveBeenNthCalledWith(1, addAdvertsRequire());
        expect(services.getAdverts).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, addAdvertsSuccess(adverts));
      });
      it('Should follow the flow upon failure to retrieve ads', async () => {
        const error = new Error('Catastrophic error');
        services.getAdverts = jest.fn().mockRejectedValue(error);
        await action(dispatch, getState, { api: { services } });
        expect(dispatch).toHaveBeenNthCalledWith(1, addAdvertsRequire());
        expect(services.getAdverts).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, addAdvertsFailure(error));
      });
    });
  });
});
