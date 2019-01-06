import {
  DEFAULT_TYPE,
  DEFAULT_TYPE_SUCCESS,
  DEFAULT_TYPE_ERROR,
} from './constants';

const initialState = {
  loading: false,
};

function productsReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case DEFAULT_TYPE:
      return { ...state, loading: true };
    case DEFAULT_TYPE_SUCCESS:
      return { ...state, loading: false };
    case DEFAULT_TYPE_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default productsReducer;
