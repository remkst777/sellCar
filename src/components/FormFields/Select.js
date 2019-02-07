import React from 'react';
import PropTypes from 'prop-types';
import NotCreatable from 'react-select';
import Creatable from 'react-select/lib/Creatable';

import Warning from './Warning';
import Label from './Label';
import { blue, properties } from './Element';

const SelectField = ({
  input = {},
  label,
  options,
  isMulti,
  isClearable,
  isSearchable,
  disabled,
  defaultValue,
  meta,
  size,
  isCreatable,
  className,
  placeholder,
  allOption,
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
        isClearable={isClearable}
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
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SelectField;
