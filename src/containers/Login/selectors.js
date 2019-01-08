import { createSelector } from 'reselect';

export const selectLoginReducer = state => state.loginReducer;

/* eslint implicit-arrow-linebreak: 0 */
export const select = item =>
  createSelector(
    selectLoginReducer,
    substate => substate[item],
  );
