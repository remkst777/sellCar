import React from 'react';
import PropTypes from 'prop-types';
import InputFiles from 'react-input-files';

import Button from './Button';
import Warning from './Warning';

const FileInput = ({ input, size, placeholder, className, meta, disabled }) => (
  <div className={className}>
    <InputFiles {...input} style={{ width: '100%' }}>
      <Button size={size} name={placeholder} disabled={disabled} />
      <Warning {...meta} />
    </InputFiles>
  </div>
);

FileInput.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  meta: PropTypes.object,
};

export default React.memo(FileInput);
