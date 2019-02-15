import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { red } from 'style-constants';

const WarningStyled = styled.h6`
  font-size: 11px;
  color: ${red};
  padding: 5px;
  animation: TT1 0.5s;
  letter-spacing: 0.3px;

  @keyframes TT1 {
    from {
      padding: 0;
      opacity: 0;
    }

    to {
      padding: 5px;
      opacity: 1;
    }
  }
`;

const Warning = ({ touched, error, warning }) =>
  touched && (error || warning) ? (
    <WarningStyled>{error || warning}</WarningStyled>
  ) : null;

Warning.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.string,
  warning: PropTypes.string,
};

export default React.memo(Warning);
