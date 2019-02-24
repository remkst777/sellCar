import { getUserDataUtil, addToCartUtil } from 'utils/accountManagement';

import { select as cartSelect } from 'containers/Cart/selectors';
import { selectCar } from 'containers/DataCacheProvider/selectors';

import { getContentOfMyCart } from 'containers/Cart/actions';
import { GET_CONTENT_OF_MY_CART_SUCCESS } from 'containers/Cart/constants';

import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from './constants';

export const addToCartAction = id => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const userData = await addToCartUtil(id);

      // get cart items
      const cartItems = cartSelect('cartItems')(state);

      // get car object by carId from DataCacheProvider
      const cachedCar = selectCar(id)(state);

      // concat it and put to cart store
      dispatch({
        type: GET_CONTENT_OF_MY_CART_SUCCESS,
        cars: cartItems.concat(cachedCar),
      });

      dispatch({
        type: GET_USER_DATA_SUCCESS,
        userData,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export function getUserData() {
  return async dispatch => {
    try {
      dispatch({
        type: GET_USER_DATA,
      });

      const userData = await getUserDataUtil();

      dispatch({
        type: GET_USER_DATA_SUCCESS,
        userData,
      });

      dispatch(getContentOfMyCart());
    } catch (err) {
      dispatch({
        type: GET_USER_DATA_ERROR,
      });
    }
  };
}
