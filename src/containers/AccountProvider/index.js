import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getOptionList } from 'containers/Cars/actions';
import { getUserData } from './actions';

class AccountProvider extends React.Component {
  componentDidMount() {
    // TODO: check - it works slowly
    this.props.getUserDataDispatch();
    this.props.getOptionListDispatch();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

AccountProvider.propTypes = {
  getUserDataDispatch: PropTypes.func.isRequired,
  getOptionListDispatch: PropTypes.func.isRequired,
  children: PropTypes.element,
};

const mapDispatchToProps = dispatch => ({
  getUserDataDispatch: bindActionCreators(getUserData, dispatch),
  getOptionListDispatch: bindActionCreators(getOptionList, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(AccountProvider);
