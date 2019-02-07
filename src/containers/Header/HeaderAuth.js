import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';

const HeaderNOTAuth = ({ username }) => [
  <li className="text-warning" key="profile">
    <Link to={routes.profile}>● {username} ●</Link>
  </li>,
];

export default HeaderNOTAuth;
