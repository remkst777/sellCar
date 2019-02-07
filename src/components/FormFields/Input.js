import React from 'react';
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

export default Input;
