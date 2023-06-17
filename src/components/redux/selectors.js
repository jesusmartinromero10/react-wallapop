export const getIsLogged = state => state.auth;

export const getAdverts = state => {
  return state.adverts.data;
};

export const getReduxAdvert = id => state =>
  getAdverts(state).find(advert => advert.id === id);

export const getUi = state => state.ui;

export const areAdvertsLoaded = state => state.adverts.areLoaded;

export const getReduxTags = state => state.tags;
