import { createSelector } from 'reselect';

export const selectSingleCarReducer = state => state.singleCarReducer;

/* eslint implicit-arrow-linebreak: 0 */
export const select = item =>
  createSelector(
    selectSingleCarReducer,
    substate => substate[item],
  );
