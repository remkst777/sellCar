import { getUserDataUtil, addToCartUtil } from 'utils/accountManagement';

import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from './constants';

export const addToCartAction = id => {
  return async dispatch => {
    try {
      const userData = await addToCartUtil(id);

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
    } catch (err) {
      dispatch({
        type: GET_USER_DATA_ERROR,
      });
    }
  };
}
