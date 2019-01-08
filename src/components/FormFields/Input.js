import React from 'react';
import styled from 'styled-components';

import Element from './Element';
import Warning from './Warning';

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
}) => {
  return (
    <Box className={className} size={size}>
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

export default Input;
