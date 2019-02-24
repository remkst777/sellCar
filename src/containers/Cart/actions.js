import { getContentOfMyCartUtil } from 'utils/accountManagement';
import { putToCache } from 'containers/DataCacheProvider/actions';

import {
  GET_CONTENT_OF_MY_CART,
  GET_CONTENT_OF_MY_CART_SUCCESS,
  GET_CONTENT_OF_MY_CART_ERROR,
} from './constants';

export function getContentOfMyCart() {
  return async dispatch => {
    try {
      dispatch({
        type: GET_CONTENT_OF_MY_CART,
      });

      const cars = await getContentOfMyCartUtil();

      dispatch(putToCache('cars', cars));

      dispatch({
        type: GET_CONTENT_OF_MY_CART_SUCCESS,
        cars,
      });
    } catch (err) {
      dispatch({
        type: GET_CONTENT_OF_MY_CART_ERROR,
      });
    }
  };
}
