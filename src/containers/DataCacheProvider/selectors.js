import { createSelector } from 'reselect';

export const selectDataCacheProviderReducer = state =>
  state.dataCacheProviderReducer;

/* eslint implicit-arrow-linebreak: 0 */
/* eslint no-underscore-dangle: 0 */
export const selectCar = carId =>
  createSelector(
    selectDataCacheProviderReducer,
    substate => substate.cars.filter(x => x._id === carId)[0],
  );
