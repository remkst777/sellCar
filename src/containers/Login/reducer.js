import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

const initialState = {
  loading: false,
};

function loginReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false };
    case LOGIN_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default loginReducer;
