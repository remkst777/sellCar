import React from 'react';
import PropTypes from 'prop-types';

import { signupUtil } from 'utils/accountManagement';
import ModalDialog from 'components/ModalDialog';

import {
  SIGNUP_FORM_EMAIL_FIELD,
  SIGNUP_FORM_PASSWORD_FIELD,
  SIGNUP_FORM_USERNAME,
} from './constants';

import SignUpForm from './SignUpForm';

class SignUp extends React.PureComponent {
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
      this.hideModal();
    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false, modalVisible: false });
  };

  render() {
    const { element } = this.props;
    const { loading, modalVisible } = this.state;

    return (
      <React.Fragment>
        {React.createElement(element, { onClick: this.showModal }, 'Sign Up')}

        <ModalDialog isActive={modalVisible} onClose={this.hideModal}>
          <SignUpForm
            size="lg"
            submitRegistr={this.submitRegistr}
            loading={loading}
          />
        </ModalDialog>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  element: PropTypes.string,
};

export default SignUp;
