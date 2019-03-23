import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { select as accountProviderSelect } from 'containers/AccountProvider/selectors';

import HeaderView from './HeaderView';

const Header = ({ userData }) => <HeaderView userData={userData} />;

Header.propTypes = {
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userData: accountProviderSelect('userData'),
});

export default connect(
  mapStateToProps,
  null,
)(Header);
