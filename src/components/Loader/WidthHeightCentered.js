import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Loader from './index';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const LoaderStyled = ({ size }) => (
  <Div>
    <Loader size={size} />
  </Div>
);

LoaderStyled.propTypes = {
  size: PropTypes.string,
};

export default LoaderStyled;
