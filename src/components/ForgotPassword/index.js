import React from 'react';
import ModalDialog from 'components/ModalDialog';
import { recoverPasswordUtil } from 'utils/accountManagement';
import { hideModal } from 'utils/modal';

import {
  MODAL_DIALOG_FORGOT_PASSWORD_ID,
  FORGOT_PASSWORD_FORM_EMAIL_FIELD,
} from './constants';

import ForgotPasswordForm from './ForgotPasswordForm';

class ForgotPassword extends React.PureComponent {
  state = {
    loading: false,
  };

  submitForgotPassword = async (...args) => {
    const data = {
      email: args[0][FORGOT_PASSWORD_FORM_EMAIL_FIELD],
    };

    this.setState({ loading: true });

    try {
      await recoverPasswordUtil(data);
      args[2].reset();
      hideModal(MODAL_DIALOG_FORGOT_PASSWORD_ID);
    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <ModalDialog id={MODAL_DIALOG_FORGOT_PASSWORD_ID}>
        <ForgotPasswordForm
          size="lg"
          submitForgotPassword={this.submitForgotPassword}
          loading={this.state.loading}
        />
      </ModalDialog>
    );
  }
}

export default ForgotPassword;
