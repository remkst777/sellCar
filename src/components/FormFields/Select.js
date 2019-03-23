import React from 'react';
import PropTypes from 'prop-types';
import NotCreatable from 'react-select';
import Creatable from 'react-select/lib/Creatable';

import { blue } from 'style-constants';

import Warning from './Warning';
import Label from './Label';
import { properties } from './Element';

const SelectField = ({
  label,
  options,
  isMulti,
  isCreatable,
  isSearchable,
  disabled,
  defaultValue,
  meta,
  size,
  className,
  placeholder,
  allOption,
  input = {},
}) => {
  const Select = isCreatable ? Creatable : NotCreatable;

  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <Select
        {...input}
        inputId={`${input.name}_${Math.random()}`}
        onBlur={() => input.onBlur && input.onBlur(input.value)}
        isMulti={isMulti}
        isCreatable={isCreatable}
        isSearchable={isSearchable}
        isDisabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={
          allOption ? [{ label: 'all', value: '' }, ...options] : options
        }
        styles={{
          control: base => ({
            ...base,
            height: properties[size].height,
            border: `1px solid ${blue} !important`,
            backgroundColor: 'transparent',
            opacity: disabled ? 0.5 : 1,
          }),
          indicatorSeparator: base => ({
            ...base,
            color: `${blue}`,
          }),
          clearIndicator: base => ({
            ...base,
            color: `${blue}`,
          }),
          dropdownIndicator: base => ({
            ...base,
            color: `${blue} !important`,
          }),
          singleValue: base => ({
            ...base,
            color: `${blue}`,
            fontSize: properties[size].fontSize,
            letterSpacing: '-0.3px',
          }),
          placeholder: base => ({
            ...base,
            color: `${blue}7F`,
            fontSize: properties[size].fontSize,
            letterSpacing: '-0.3px',
          }),
          menu: base => ({
            ...base,
            color: `${blue}`,
            fontSize: properties[size].fontSize,
            letterSpacing: '-0.3px',
          }),
        }}
      />
      <Warning {...meta} />
    </div>
  );
};

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  isCreatable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  allOption: PropTypes.bool,
  size: PropTypes.string,
};

export default React.memo(SelectField);
