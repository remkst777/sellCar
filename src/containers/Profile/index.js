import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import * as routes from 'routes-config';

import { select as accountProviderSelect } from 'containers/AccountProvider/selectors';
import { showToast } from 'utils/toasts';

import { select as profileSelect } from './selectors';
import { showChangePasswordModal, logout } from './actions';
import ProfileView from './ProfileView';

class Profile extends React.PureComponent {
  componentDidUpdate() {
    const type = 'error';
    const message = 'Not authorized';
    const { userData, userDataLoading } = this.props;

    if (!userDataLoading && !userData) {
      this.props.history.push(routes.homepage);
      showToast(type, message);
    }
  }

  logout = () => {
    const { history, logoutDispatch } = this.props;
    logoutDispatch(history);
  };

  render() {
    const {
      userData,
      loadingLogout,
      showChangePasswordModalDispatch,
    } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>Profile</title>
          <meta name="description" content="Profile | Description" />
        </Helmet>

        {userData && (
          <ProfileView
            logout={this.logout}
            loadingLogout={loadingLogout}
            showChangePasswordModal={showChangePasswordModalDispatch}
          />
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  userData: PropTypes.object,
  history: PropTypes.object.isRequired,
  userDataLoading: PropTypes.bool.isRequired,
  loadingLogout: PropTypes.bool.isRequired,
  logoutDispatch: PropTypes.func.isRequired,
  showChangePasswordModalDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userData: accountProviderSelect('userData'),
  userDataLoading: accountProviderSelect('loading'),
  loadingLogout: profileSelect('loadingLogout'),
});

const mapDispatchToProps = dispatch => ({
  logoutDispatch: bindActionCreators(logout, dispatch),
  showChangePasswordModalDispatch: bindActionCreators(
    showChangePasswordModal,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
