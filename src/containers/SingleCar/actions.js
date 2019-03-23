import {
  saveArrayOfImages,
  updateAutoUtil,
  deleteCarUtil,
} from 'utils/autoManagement';

import {
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
} from 'containers/Cars/constants';

import { getOptionList } from 'containers/Cars/actions';

import {
  getCarFromCache,
  putToCache,
} from 'containers/DataCacheProvider/actions';

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

export function getCarById(id) {
  return async dispatch => {
    try {
      dispatch({
        type: GET_CAR_BY_ID,
      });

      const car = await dispatch(getCarFromCache(id));

      dispatch({
        type: GET_CAR_BY_ID_SUCCESS,
        car,
      });
    } catch (err) {
      dispatch({
        type: GET_CAR_BY_ID_ERROR,
      });
    }
  };
}

/* eslint consistent-return: 0 */
export function deleteCar(id) {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_CAR,
      });

      await deleteCarUtil(id);

      dispatch({
        type: DELETE_CAR_SUCCESS,
      });

      dispatch(getOptionList());

      return true;
    } catch (err) {
      dispatch({
        type: DELETE_CAR_ERROR,
      });
    }
  };
}

export function updateCar(val, resetForm, carId) {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_CAR,
      });

      const fotos = await saveArrayOfImages(val[IMAGES_FIELD]);

      const savedObject = {
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
      };

      const car = await updateAutoUtil(savedObject, carId);

      dispatch(putToCache('cars', [car]));

      resetForm();

      dispatch(getOptionList());

      dispatch({
        type: UPDATE_CAR_SUCCESS,
        car,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_CAR_ERROR,
      });
    }
  };
}
