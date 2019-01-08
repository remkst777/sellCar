import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR } from './constants';

const initialState = {
  loadingLogout: false,
};

function profileReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOGOUT:
      return { ...state, loadingLogout: true };
    case LOGOUT_SUCCESS:
      return { ...state, loadingLogout: false };
    case LOGOUT_ERROR:
      return { ...state, loadingLogout: false };

    default:
      return state;
  }
}

export default profileReducer;
