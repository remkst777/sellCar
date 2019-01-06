import React from 'react';
import PropTypes from 'prop-types';

import spinner from '../../images/spinner.svg';
import LoaderStyled from './LoaderStyled';

const Loader = ({ size }) => (
  <LoaderStyled size={size}>
    <img src={spinner} alt="spinner" />
  </LoaderStyled>
);

Loader.propTypes = {
  size: PropTypes.string.isRequired,
};

export default Loader;
