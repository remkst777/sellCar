import React from 'react';
import styled from 'styled-components';

import Element from './Element';
import Warning from './Warning';

const Box = styled.div`
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
  meta: { touched, error, warning },
}) => {
  return (
    <Box className={className} size={size}>
      <input
        {...input}
        disabled={disabled}
        type="text"
        autoComplete="off"
        placeholder={placeholder}
      />
      {touched && (error || warning) && <Warning>{error || warning}</Warning>}
    </Box>
  );
};

export default Input;
