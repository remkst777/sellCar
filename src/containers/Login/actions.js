import { loginUtil, sendVerificationLetterUtil } from 'utils/accountManagement';
import { hideModal, showModal, hideAllActiveModals } from 'utils/modal';

import { GET_USER_DATA_SUCCESS } from 'containers/AccountProvider/constants';
import { MODAL_DIALOG_FORGOT_PASSWORD_ID } from 'components/ForgotPassword/constants';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SEND_VERIFICATION_LETTER,
  SEND_VERIFICATION_LETTER_SUCCESS,
  SEND_VERIFICATION_LETTER_ERROR,
  MODAL_DIALOG_LOGIN_ID,
} from './constants';

export function login(data) {
  return async dispatch => {
    try {
      dispatch({
        type: LOGIN,
      });

      const userData = await loginUtil(data);

      dispatch({
        type: LOGIN_SUCCESS,
      });

      dispatch({
        type: GET_USER_DATA_SUCCESS,
        userData,
      });

      hideModal(MODAL_DIALOG_LOGIN_ID);
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

export function showForgotPasswordModal() {
  return async () => {
    hideAllActiveModals();
    showModal(MODAL_DIALOG_FORGOT_PASSWORD_ID);
  };
}
