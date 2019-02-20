import { createSelector } from 'reselect';

export const selectCartReducer = state => state.cartReducer;

/* eslint implicit-arrow-linebreak: 0 */
export const select = item =>
  createSelector(
    selectCartReducer,
    substate => substate[item],
  );
