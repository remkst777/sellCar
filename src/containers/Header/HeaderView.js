import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';

import Loader from 'components/Loader';

import SearchBasicForm from 'components/SearchBasicForm';

import HeaderStyled from './HeaderStyled';
import AnimatedForm from './AnimatedForm';
import HeaderNOTAuth from './HeaderNOTAuth';
import HeaderAuth from './HeaderAuth';

import { SEARCH_FIELD_NAME_FORM } from './constants';

const routeHomepage = routes.homepage();

const HeaderView = ({
  isFormShowed,
  submitSearch,
  showModal,
  userData,
  showForm,
}) => (
  <HeaderStyled>
    <div className="container-fluid">
      <AnimatedForm className="row" animate={isFormShowed}>
        <div className="col-12">
          <SearchBasicForm
            searchFieldName={SEARCH_FIELD_NAME_FORM}
            submitSearch={submitSearch}
            size="lg"
          />
        </div>
      </AnimatedForm>

      <div className="row">
        <div className="col-6 d-flex align-items-center">
          <Loader size="sm" />

          <Link className="col-6" to={routeHomepage}>
            MOLECULAR ATOMIĆ
          </Link>
        </div>
        <div className="col-6 align-items-center justify-content-end d-flex">
          <ul className="d-flex">
            <li onClick={showForm}>Search</li>
            <li>
              <Link to={routeHomepage}>About Us</Link>
            </li>
            <li>
              <Link to={routeHomepage}>Products</Link>
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
