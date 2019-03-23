import React from 'react';
import PropTypes from 'prop-types';

import ModalDialog from 'components/ModalDialog';
import { recoverPasswordUtil } from 'utils/accountManagement';

import { FORGOT_PASSWORD_FORM_EMAIL_FIELD } from './constants';

import ForgotPasswordForm from './ForgotPasswordForm';

class ForgotPassword extends React.PureComponent {
  state = {
    loading: false,
    modalVisible: false,
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  submitForgotPassword = async (...args) => {
    const data = {
      email: args[0][FORGOT_PASSWORD_FORM_EMAIL_FIELD],
    };

    this.setState({ loading: true });

    try {
      await recoverPasswordUtil(data);
      args[2].reset();
      this.hideModal();
    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false, modalVisible: false });
  };

  render() {
    const { children } = this.props;
    const { loading, modalVisible } = this.state;

    return (
      <React.Fragment>
        {children(this.showModal)}

        <ModalDialog isActive={modalVisible} onClose={this.hideModal}>
          <ForgotPasswordForm
            size="lg"
            submitForgotPassword={this.submitForgotPassword}
            loading={loading}
          />
        </ModalDialog>
      </React.Fragment>
    );
  }
}

ForgotPassword.propTypes = {
  children: PropTypes.any,
};

export default ForgotPassword;
