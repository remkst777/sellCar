import { createSelector } from 'reselect';

export const selectProfileReducer = state => state.profileReducer;

/* eslint implicit-arrow-linebreak: 0 */
export const select = item =>
  createSelector(
    selectProfileReducer,
    substate => substate[item],
  );
