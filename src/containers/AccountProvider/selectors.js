import { createSelector } from 'reselect';

export const selectAccountProviderReducer = state =>
  state.accountProviderReducer;

/* eslint implicit-arrow-linebreak: 0 */
export const select = item =>
  createSelector(
    selectAccountProviderReducer,
    substate => substate[item],
  );

export const selectCart = () =>
  createSelector(
    selectAccountProviderReducer,
    substate => (substate.userData ? substate.userData.cart : null),
  );
