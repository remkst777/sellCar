import { createSelector } from 'reselect';

export const selectProductsReducer = state => state.productsReducer;

/* eslint implicit-arrow-linebreak: 0 */
export const select = item =>
  createSelector(
    selectProductsReducer,
    substate => substate[item],
  );
