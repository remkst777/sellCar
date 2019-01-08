import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUserData } from './actions';

class Login extends React.Component {
  componentDidMount() {
    this.props.getUserDataDispatch();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Login.propTypes = {
  getUserDataDispatch: PropTypes.func.isRequired,
  children: PropTypes.element,
};

const mapDispatchToProps = dispatch => ({
  getUserDataDispatch: bindActionCreators(getUserData, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
