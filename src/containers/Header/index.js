import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { showModal } from 'utils/modal';
import { select as accountProviderSelect } from 'containers/AccountProvider/selectors';

import HeaderView from './HeaderView';

class Header extends React.Component {
  state = {
    isFormShowed: false,
  };

  showForm = () => {
    this.setState({ isFormShowed: !this.state.isFormShowed });
  };

  showModal = e => {
    const { modaltype } = e.target.dataset;
    showModal(modaltype);
  };

  render() {
    const { userData } = this.props;

    return (
      <HeaderView
        submitSearch={() => true}
        isFormShowed={this.state.isFormShowed}
        userData={userData}
        showModal={this.showModal}
        showForm={this.showForm}
      />
    );
  }
}

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
