import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';

const HeaderAuth = ({ username, cartLength }) => [
  <li className="text-warning" key="profile">
    <Link to={routes.profile}>
      ● {username} {cartLength ? `(${cartLength})` : ''} ●
    </Link>
  </li>,
];

export default React.memo(HeaderAuth);
