import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { cart as cartRoute } from 'routes-config';

import Button from 'components/FormFields/Button';
import ChangePassword from 'components/ChangePassword';

const ProfileView = ({ logout, loadingLogout }) => (
  <div className="my-5">
    <Link to={cartRoute}>
      <Button size="lg" className="col-12 my-2" name="Cart" />
    </Link>
    <ChangePassword>
      {onClick => (
        <Button
          size="lg"
          onClick={onClick}
          className="col-12 my-2"
          name="Change password"
        />
      )}
    </ChangePassword>

    <Button
      disabled={loadingLogout}
      size="lg"
      onClick={logout}
      className="col-12 my-2"
      name="Logout"
    />
  </div>
);

ProfileView.propTypes = {
  logout: PropTypes.func.isRequired,
  loadingLogout: PropTypes.bool.isRequired,
};

export default React.memo(ProfileView);
