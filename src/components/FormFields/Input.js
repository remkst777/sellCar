import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Element from './Element';
import Warning from './Warning';
import Label from './Label';

const Box = styled.div`
  margin-bottom: 12px;
  input {
    ${props => Element(props.size)};
  }
`;

const Input = ({
  input,
  className,
  disabled,
  placeholder,
  size,
  type,
  meta,
  label,
}) => {
  return (
    <Box className={className} size={size}>
      {label && <Label>{label}</Label>}
      <input
        {...input}
        disabled={disabled}
        type={type || 'text'}
        autoComplete="off"
        placeholder={placeholder}
      />
      <Warning {...meta} />
    </Box>
  );
};

Input.propTypes = {
  input: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  label: PropTypes.string,
};

export default React.memo(Input);
