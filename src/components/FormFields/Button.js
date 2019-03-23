import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Element from './Element';

const Box = styled.div`
  button {
    ${props => Element(props.size)};
  }
`;

const Button = ({
  type,
  size,
  name,
  disabled,
  className,
  onClick,
  dataset,
}) => {
  return (
    <Box className={className} size={size}>
      <button {...dataset} type={type} disabled={disabled} onClick={onClick}>
        {name}
      </button>
    </Box>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  dataset: PropTypes.object,
};

export default React.memo(Button);
