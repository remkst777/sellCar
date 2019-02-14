import {
  GET_CAR_BY_ID,
  GET_CAR_BY_ID_SUCCESS,
  GET_CAR_BY_ID_ERROR,
  UPDATE_CAR,
  UPDATE_CAR_SUCCESS,
  UPDATE_CAR_ERROR,
  DELETE_CAR,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_ERROR,
} from './constants';

const initialState = {
  car: null,
  carLoading: false,
  updateCarLoading: false,
  deleteCarLoading: false,
};

function singleCarReducer(state = initialState, action) {
  const { type, car } = action;

  switch (type) {
    case GET_CAR_BY_ID:
      return { ...state, carLoading: true };
    case GET_CAR_BY_ID_SUCCESS:
      return { ...state, carLoading: false, car };
    case GET_CAR_BY_ID_ERROR:
      return { ...state, carLoading: false };

    case UPDATE_CAR:
      return { ...state, updateCarLoading: true };
    case UPDATE_CAR_SUCCESS:
      return { ...state, updateCarLoading: false, car };
    case UPDATE_CAR_ERROR:
      return { ...state, updateCarLoading: false };

    case DELETE_CAR:
      return { ...state, deleteCarLoading: true };
    case DELETE_CAR_SUCCESS:
      return { ...state, deleteCarLoading: false, car: initialState.car };
    case DELETE_CAR_ERROR:
      return { ...state, deleteCarLoading: false };

    default:
      return state;
  }
}

export default singleCarReducer;
