import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { blue } from 'style-constants';

import ModalDialog from 'components/ModalDialog';
import ForgotPassword from 'components/ForgotPassword';

import LoginForm from './components/LoginForm';
import { select } from './selectors';

import { login } from './actions';

import { LOGIN_FORM_EMAIL_FIELD, LOGIN_FORM_PASSWORD_FIELD } from './constants';

const Badge = styled.div`
  cursor: pointer;
  letter-spacing: -0.7px;
  color: ${blue};
`;

class Login extends React.PureComponent {
  state = {
    modalVisible: false,
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  submitLogin = val => {
    const email = val[LOGIN_FORM_EMAIL_FIELD];
    const password = val[LOGIN_FORM_PASSWORD_FIELD];

    this.props.loginDispatch(
      {
        email,
        password,
      },
      this.hideModal,
    );
  };

  render() {
    const { loading, element } = this.props;

    return (
      <React.Fragment>
        {React.createElement(element, { onClick: this.showModal }, 'Login')}

        <ModalDialog
          isActive={this.state.modalVisible}
          onClose={this.hideModal}
        >
          <div>
            <LoginForm
              size="lg"
              submitLogin={this.submitLogin}
              loading={loading}
            />
            <ForgotPassword>
              {onClick => (
                <Badge onClick={onClick} className="pt-3">
                  Forgot password?
                </Badge>
              )}
            </ForgotPassword>
          </div>
        </ModalDialog>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  element: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loginDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: select('loading'),
});

const mapDispatchToProps = dispatch => ({
  loginDispatch: bindActionCreators(login, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
