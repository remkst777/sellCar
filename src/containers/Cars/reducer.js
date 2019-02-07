import {
  SET_OPTION,
  GET_OPTION_LIST,
  GET_OPTION_LIST_SUCCESS,
  GET_OPTION_LIST_ERROR,
  ADD_CAR,
  ADD_CAR_SUCCESS,
  ADD_CAR_ERROR,
  LOAD_CAR,
  LOAD_CAR_SUCCESS,
  LOAD_CAR_ERROR,
  SET_DEFAULT_REDUCER,
  SORT_CARS,
} from './constants';

const initialState = {
  pagination: 10,
  getOptionListLoading: false,
  addCarLoading: false,
  loadCarsLoading: false,
  cars: [],
  ranges: {},
  isLast: false,
  options: {
    brand: [],
    model: [],
    manufacturer: [],
    color: [],
    body: [],
    fuel: [],
  },
  sort: {
    name: 'cost',
    value: -1,
  },
};

function carsReducer(state = initialState, action) {
  const { type, list, option, cars, name, value, ranges, next } = action;

  switch (type) {
    case SET_DEFAULT_REDUCER:
      return {
        ...state,
        cars: initialState.cars,
        manufacturer: initialState.manufacturer,
      };

    case SORT_CARS:
      return { ...state, sort: { name, value: +value * -1 } };

    case SET_OPTION:
      return { ...state, options: { ...state.options, [option]: list } };

    case GET_OPTION_LIST:
      return { ...state, getOptionListLoading: true };
    case GET_OPTION_LIST_SUCCESS:
      return { ...state, getOptionListLoading: false };
    case GET_OPTION_LIST_ERROR:
      return { ...state, getOptionListLoading: false };

    case LOAD_CAR:
      return { ...state, loadCarsLoading: true };
    case LOAD_CAR_SUCCESS:
      return {
        ...state,
        loadCarsLoading: false,
        cars: next ? state.cars.concat(cars) : cars,
        isLast: cars.length < initialState.pagination,
        ranges,
      };
    case LOAD_CAR_ERROR:
      return { ...state, loadCarsLoading: false };

    case ADD_CAR:
      return { ...state, addCarLoading: true };
    case ADD_CAR_SUCCESS:
      return { ...state, addCarLoading: false };
    case ADD_CAR_ERROR:
      return { ...state, addCarLoading: false };

    default:
      return state;
  }
}

export default carsReducer;
