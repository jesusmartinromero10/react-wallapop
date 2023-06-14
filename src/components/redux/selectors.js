export const getIsLogged = state => state.auth;

export const getAdverts = state => {
  return state.adverts.data;
};

export const getReduxAdvert = (state, id) =>
  getAdverts(state).find(advert => advert.id === id);

export const getUi = state => state.ui;

export const areAdvertsLoaded = state => state.adverts.areLoaded;
