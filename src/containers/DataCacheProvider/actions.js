import { getCarByIdUtil } from 'utils/autoManagement';

import { PUT_TO_CACHE } from './constants';
import { selectCar } from './selectors';

/* eslint consistent-return: 0 */
/* eslint no-use-before-define: 0 */
export function getCarFromCache(carId) {
  return async (dispatch, getState) => {
    try {
      const cachedCar = selectCar(carId)(getState());

      if (cachedCar) {
        return cachedCar;
      }

      const carFromBD = await getCarByIdUtil(carId);

      dispatch(putToCache('cars', [carFromBD]));

      return carFromBD;
    } catch (err) {
      console.log(err);
    }
  };
}

/*
 *
 * @stateValue - ex. cars
 * @stateValueData - ex. [car1, car2, ...]
 *
 */

export function putToCache(stateValue, stateValueData) {
  return {
    type: PUT_TO_CACHE,
    stateValue,
    stateValueData,
  };
}
