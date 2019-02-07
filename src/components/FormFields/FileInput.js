import React from 'react';
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

export default FileInput;
