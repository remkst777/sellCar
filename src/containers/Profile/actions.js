import * as routes from 'routes-config';
import { logoutUtil } from 'utils/accountManagement';
import { showModal } from 'utils/modal';

import { GET_USER_DATA_SUCCESS } from 'containers/AccountProvider/constants';
import { MODAL_DIALOG_CHANGE_PASSWORD_ID } from 'components/ChangePassword/constants';

import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR } from './constants';

export function logout(history) {
  return async dispatch => {
    try {
      dispatch({
        type: LOGOUT,
      });

      await logoutUtil();

      await history.push(routes.homepage());

      dispatch({
        type: GET_USER_DATA_SUCCESS,
        userData: null,
      });

      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: LOGOUT_ERROR,
      });
    }
  };
}

export function showChangePasswordModal() {
  return async () => {
    showModal(MODAL_DIALOG_CHANGE_PASSWORD_ID);
  };
}
