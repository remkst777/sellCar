import { change } from 'redux-form';

import {
  getOptionListUtil,
  getCorrectListForSelect,
  getManufacturerWithModelsListUtil,
  saveArrayOfImages,
  saveAutoUtil,
  loadCarsUtil,
  getManufacturerUtil,
  getRangeValuesUtil,
} from 'utils/autoManagement';

import { hideModal } from 'utils/modal';

import {
  GET_OPTION_LIST,
  SET_OPTION,
  GET_OPTION_LIST_SUCCESS,
  GET_OPTION_LIST_ERROR,
  ADD_CAR,
  ADD_CAR_SUCCESS,
  ADD_CAR_ERROR,
  IMAGES_FIELD,
  BRAND_FIELD,
  MODEL_FIELD,
  MANUFACTURER_FIELD,
  COLOR_FIELD,
  BODY_FIELD,
  FUEL_FIELD,
  YEAR_FIELD,
  CAPACITY_FIELD,
  COST_FIELD,
  DESCRIPTION_FIELD,
  ADD_AUTO_MODAL_ID,
  LOAD_CAR,
  LOAD_CAR_SUCCESS,
  LOAD_CAR_ERROR,
  SET_DEFAULT_REDUCER,
  SORT_CARS,
} from './constants';

export function loadCars(filter, sort, pagination, offset, next) {
  return async dispatch => {
    try {
      dispatch({
        type: LOAD_CAR,
      });

      // load cars with filter(@object)
      const cars = await loadCarsUtil(filter, sort, pagination, offset);

      // get ranges for findCar form
      const ranges = await getRangeValuesUtil(filter);

      dispatch({
        type: LOAD_CAR_SUCCESS,
        cars,
        ranges,
        next,
      });
    } catch (err) {
      dispatch({
        type: LOAD_CAR_ERROR,
      });
    }
  };
}

export function getOptionList() {
  return async dispatch => {
    const arr = ['brand', 'manufacturer', 'color', 'body', 'fuel'];

    try {
      dispatch({
        type: GET_OPTION_LIST,
      });

      await Promise.all([
        (async () => {
          await Promise.all(
            arr.map(async option => {
              const list = await getOptionListUtil(option);
              const correctedList = getCorrectListForSelect(list);

              dispatch({
                type: SET_OPTION,
                option,
                list: correctedList,
              });
            }),
          );
        })(),
      ]);

      dispatch({
        type: GET_OPTION_LIST_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: GET_OPTION_LIST_ERROR,
      });
    }
  };
}

export function getManufacturerWithModelsList(brand, formName) {
  return async dispatch => {
    try {
      dispatch({
        type: GET_OPTION_LIST,
      });

      // get model list after BRAND selecting
      const p1 = async () => {
        const list = await getManufacturerWithModelsListUtil(brand);
        const correctedList = getCorrectListForSelect(list);

        dispatch({
          type: SET_OPTION,
          option: 'model',
          list: correctedList,
        });
      };

      // get manufacturer for selected BRAND
      const p2 = async () => {
        const manufacturer = await getManufacturerUtil(brand);
        const correctedList = getCorrectListForSelect(manufacturer);

        dispatch(change(formName, MANUFACTURER_FIELD, correctedList[0]));
      };

      await Promise.all([p1(), p2()]);

      dispatch({
        type: GET_OPTION_LIST_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: GET_OPTION_LIST_ERROR,
      });
    }
  };
}

export function addCar(val, resetForm) {
  return async dispatch => {
    try {
      dispatch({
        type: ADD_CAR,
      });

      const fotos = await saveArrayOfImages(val[IMAGES_FIELD]);

      await saveAutoUtil({
        fotos,
        brand: val[BRAND_FIELD].value,
        model: val[MODEL_FIELD].value,
        manufacturer: val[MANUFACTURER_FIELD].value,
        color: val[COLOR_FIELD].value,
        body: val[BODY_FIELD].value,
        fuel: val[FUEL_FIELD].value,
        year: +val[YEAR_FIELD],
        capacity: +val[CAPACITY_FIELD],
        cost: +val[COST_FIELD],
        description: val[DESCRIPTION_FIELD],
      });

      resetForm();
      hideModal(ADD_AUTO_MODAL_ID);

      dispatch(getOptionList());

      dispatch({
        type: ADD_CAR_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: ADD_CAR_ERROR,
      });
    }
  };
}

export function sortCars(name, value) {
  return async dispatch => {
    dispatch({
      type: SORT_CARS,
      name,
      value,
    });
  };
}

export function setDefaultReducer() {
  return async dispatch => {
    dispatch({
      type: SET_DEFAULT_REDUCER,
    });
  };
}
