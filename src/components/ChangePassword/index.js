import React from 'react';
import ModalDialog from 'components/ModalDialog';
import { changePasswordUtil } from 'utils/accountManagement';
import { hideModal } from 'utils/modal';

import {
  MODAL_DIALOG_CHANGE_PASSWORD_ID,
  CHANGE_PASSWORD_FORM_EMAIL_FIELD,
  CHANGE_PASSWORD_FORM_PASSWORD_FIELD,
  CHANGE_PASSWORD_FORM_PASSWORD2_FIELD,
} from './constants';

import ChangePasswordForm from './ChangePasswordForm';

class ChangePassword extends React.PureComponent {
  state = {
    loading: false,
  };

  submitChangePassword = async (...args) => {
    const data = {
      email: args[0][CHANGE_PASSWORD_FORM_EMAIL_FIELD],
      password: args[0][CHANGE_PASSWORD_FORM_PASSWORD_FIELD],
      password2: args[0][CHANGE_PASSWORD_FORM_PASSWORD2_FIELD],
    };

    this.setState({ loading: true });

    try {
      await changePasswordUtil(data);
      args[2].reset();
      hideModal(MODAL_DIALOG_CHANGE_PASSWORD_ID);
    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <ModalDialog id={MODAL_DIALOG_CHANGE_PASSWORD_ID}>
        <ChangePasswordForm
          size="lg"
          submitChangePassword={this.submitChangePassword}
          loading={this.state.loading}
        />
      </ModalDialog>
    );
  }
}

export default ChangePassword;
