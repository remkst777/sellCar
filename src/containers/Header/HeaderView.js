import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';

import Loader from 'components/Loader';

import HeaderStyled from './HeaderStyled';
import HeaderNOTAuth from './HeaderNOTAuth';
import HeaderAuth from './HeaderAuth';

const HeaderView = ({ showModal, userData }) => (
  <HeaderStyled>
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 d-flex align-items-center">
          <Loader size="sm" />

          <Link className="col-6" to={routes.homepage}>
            MOLECULAR ATOMIĆ
          </Link>
        </div>
        <div className="col-6 align-items-center justify-content-end d-flex">
          <ul className="d-flex">
            <li>
              <Link to={routes.homepage}>About Us</Link>
            </li>
            <li>
              <Link to={routes.homepage}>Auto</Link>
            </li>

            {!userData && <HeaderNOTAuth showModal={showModal} />}

            {userData && <HeaderAuth username={userData.username} />}
          </ul>
        </div>
      </div>
    </div>
  </HeaderStyled>
);

HeaderView.propTypes = {
  isFormShowed: PropTypes.bool.isRequired,
  submitSearch: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  userData: PropTypes.object,
};

export default HeaderView;
