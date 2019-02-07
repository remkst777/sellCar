import { createSelector } from 'reselect';

export const selectCarsReducer = state => state.carsReducer;

/* eslint implicit-arrow-linebreak: 0 */
export const select = item =>
  createSelector(
    selectCarsReducer,
    substate => substate[item],
  );
