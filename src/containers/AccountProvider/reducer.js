import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from './constants';

const initialState = {
  loading: false,
  userData: null,
};

function accountProviderReducer(state = initialState, action) {
  const { type, userData } = action;

  switch (type) {
    case GET_USER_DATA:
      return { ...state, loading: true };
    case GET_USER_DATA_SUCCESS:
      return { ...state, loading: false, userData };
    case GET_USER_DATA_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default accountProviderReducer;
