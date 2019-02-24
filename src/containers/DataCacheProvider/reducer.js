import _ from 'lodash';

import { PUT_TO_CACHE } from './constants';

const initialState = {
  cars: [],
};

function dataCacheProviderReducer(state = initialState, action) {
  const { type, stateValue, stateValueData } = action;

  switch (type) {
    case PUT_TO_CACHE:
      return {
        ...state,
        [stateValue]: _.uniqBy(stateValueData.concat(state[stateValue]), '_id'),
      };

    default:
      return state;
  }
}

export default dataCacheProviderReducer;
