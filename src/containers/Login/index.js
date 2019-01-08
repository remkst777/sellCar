import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import ModalDialog from 'components/ModalDialog';

import LoginForm from './LoginForm';
import { select } from './selectors';

import {
  login,
  sendVerificationLetter,
  showForgotPasswordModal,
} from './actions';

import {
  MODAL_DIALOG_LOGIN_ID,
  LOGIN_FORM_EMAIL_FIELD,
  LOGIN_FORM_PASSWORD_FIELD,
} from './constants';

class Login extends React.PureComponent {
  submitLogin = val => {
    const email = val[LOGIN_FORM_EMAIL_FIELD];
    const password = val[LOGIN_FORM_PASSWORD_FIELD];

    this.props.loginDispatch({
      email,
      password,
    });
  };

  sendVerificationLetter = () => {
    this.props.sendVerificationLetterDispatch();
  };

  showForgotPasswordModal = () => {
    this.props.showForgotPasswordModalDispatch();
  };

  render() {
    const { loading } = this.props;

    return (
      <ModalDialog id={MODAL_DIALOG_LOGIN_ID}>
        <div>
          <LoginForm
            size="lg"
            submitLogin={this.submitLogin}
            loading={loading}
          />
          <div className="pt-4">
            <badge
              onClick={this.sendVerificationLetter}
              className="text-primary"
            >
              Send verification letter?
            </badge>
          </div>
          <div className="pt-3">
            <badge
              onClick={this.showForgotPasswordModal}
              className="text-primary"
            >
              Forgot password?
            </badge>
          </div>
        </div>
      </ModalDialog>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginDispatch: PropTypes.func.isRequired,
  showForgotPasswordModalDispatch: PropTypes.func.isRequired,
  sendVerificationLetterDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: select('loading'),
});

const mapDispatchToProps = dispatch => ({
  loginDispatch: bindActionCreators(login, dispatch),
  showForgotPasswordModalDispatch: bindActionCreators(
    showForgotPasswordModal,
    dispatch,
  ),
  sendVerificationLetterDispatch: bindActionCreators(
    sendVerificationLetter,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
