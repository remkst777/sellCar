import { loginUtil, sendVerificationLetterUtil } from 'utils/accountManagement';

import { getUserData } from 'containers/AccountProvider/actions';
import { GET_USER_DATA_SUCCESS } from 'containers/AccountProvider/constants';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SEND_VERIFICATION_LETTER,
  SEND_VERIFICATION_LETTER_SUCCESS,
  SEND_VERIFICATION_LETTER_ERROR,
} from './constants';

export function login(data, hideModal) {
  return async dispatch => {
    try {
      dispatch({
        type: LOGIN,
      });

      const userData = await loginUtil(data);

      dispatch(getUserData());

      dispatch({
        type: LOGIN_SUCCESS,
      });

      await hideModal();

      dispatch({
        type: GET_USER_DATA_SUCCESS,
        userData,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
}

export function sendVerificationLetter() {
  return async dispatch => {
    try {
      dispatch({
        type: SEND_VERIFICATION_LETTER,
      });

      await sendVerificationLetterUtil();

      dispatch({
        type: SEND_VERIFICATION_LETTER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: SEND_VERIFICATION_LETTER_ERROR,
      });
    }
  };
}
