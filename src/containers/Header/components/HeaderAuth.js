import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';

const HeaderAuth = ({ username, cartLength }) => (
  <React.Fragment>
    <li className="text-warning">
      <Link to={routes.profile}>
        ● {username} {cartLength ? `(${cartLength})` : ''} ●
      </Link>
    </li>
  </React.Fragment>
);

HeaderAuth.propTypes = {
  username: PropTypes.string,
  cartLength: PropTypes.number,
};

export default React.memo(HeaderAuth);
