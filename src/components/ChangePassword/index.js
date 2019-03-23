import React from 'react';
import PropTypes from 'prop-types';
import ModalDialog from 'components/ModalDialog';
import { changePasswordUtil } from 'utils/accountManagement';

import {
  CHANGE_PASSWORD_FORM_EMAIL_FIELD,
  CHANGE_PASSWORD_FORM_PASSWORD_FIELD,
  CHANGE_PASSWORD_FORM_PASSWORD2_FIELD,
} from './constants';

import ChangePasswordForm from './ChangePasswordForm';

class ChangePassword extends React.PureComponent {
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
          <ChangePasswordForm
            size="lg"
            submitChangePassword={this.submitChangePassword}
            loading={loading}
          />
        </ModalDialog>
      </React.Fragment>
    );
  }
}

ChangePassword.propTypes = {
  children: PropTypes.any,
};

export default ChangePassword;
