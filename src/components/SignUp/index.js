import React from 'react';
import { signupUtil } from 'utils/accountManagement';
import { hideModal } from 'utils/modal';

import ModalDialog from 'components/ModalDialog';
import SignUpForm from './SignUpForm';

import {
  MODAL_DIALOG_SIGN_UP_ID,
  SIGNUP_FORM_EMAIL_FIELD,
  SIGNUP_FORM_PASSWORD_FIELD,
  SIGNUP_FORM_USERNAME,
} from './constants';

class SignUp extends React.PureComponent {
  state = {
    loading: false,
  };

  submitRegistr = async (...args) => {
    const data = {
      email: args[0][SIGNUP_FORM_EMAIL_FIELD],
      password: args[0][SIGNUP_FORM_PASSWORD_FIELD],
      username: args[0][SIGNUP_FORM_USERNAME],
    };

    this.setState({ loading: true });

    try {
      await signupUtil(data);
      args[2].reset();
      hideModal(MODAL_DIALOG_SIGN_UP_ID);
    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;

    return (
      <ModalDialog id={MODAL_DIALOG_SIGN_UP_ID}>
        <SignUpForm
          size="lg"
          submitRegistr={this.submitRegistr}
          loading={loading}
        />
      </ModalDialog>
    );
  }
}

export default SignUp;
