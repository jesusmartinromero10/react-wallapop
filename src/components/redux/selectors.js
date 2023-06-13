export const getIsLogged = state => state.auth;

export const getAdverts = state => {
  return state.adverts;
};

export const getReduxAdvert = (state, id) =>
  getAdverts(state).find(advert => advert.id === id);
