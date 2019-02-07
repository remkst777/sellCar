import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import {
  required,
  selectValidation2x20,
  strLength4x4,
  strLength4x7,
  strLength5x100,
} from 'components/FormFields/validate';

import Select from 'components/FormFields/Select';
import Button from 'components/FormFields/Button';
import FileInput from 'components/FormFields/FileInput';
import Input from 'components/FormFields/Input';

import {
  IMAGES_FIELD,
  BRAND_FIELD,
  MODEL_FIELD,
  MANUFACTURER_FIELD,
  COLOR_FIELD,
  BODY_FIELD,
  FUEL_FIELD,
  YEAR_FIELD,
  CAPACITY_FIELD,
  COST_FIELD,
  DESCRIPTION_FIELD,
  ADD_CAR_FORM,
} from './constants';

/* eslint import/no-mutable-exports: 0 */
let AddCarForm = ({
  handleSubmit,
  size,
  addCar,
  change,
  options,
  getOptionListLoading,
  addCarLoading,
  brandValue,
  reset,
  getManufacturerWithModelsList,
  imagesValue = [],
}) => {
  const selectBrand = v => {
    reset();
    getManufacturerWithModelsList(v.value, ADD_CAR_FORM);
  };

  return (
    <div>
      <form className="row" onSubmit={handleSubmit(addCar)}>
        <Field
          onChange={selectBrand}
          options={options.brand}
          size={size}
          name={BRAND_FIELD}
          className="col-12 mb-2"
          placeholder="Choose brand"
          isCreatable
          disabled={getOptionListLoading || addCarLoading}
          component={Select}
          validate={[required, selectValidation2x20]}
          warn={[required, selectValidation2x20]}
        />
        <Field
          size={size}
          options={options.model}
          name={MODEL_FIELD}
          className="col-12 mb-2"
          placeholder="Choose model"
          isCreatable
          disabled={!brandValue || getOptionListLoading || addCarLoading}
          component={Select}
          validate={[required, selectValidation2x20]}
          warn={[required, selectValidation2x20]}
        />
        <Field
          size={size}
          options={options.manufacturer}
          name={MANUFACTURER_FIELD}
          className="col-12 mb-2"
          placeholder="Choose manufacturer"
          isCreatable
          disabled={getOptionListLoading || addCarLoading}
          component={Select}
          validate={[required, selectValidation2x20]}
          warn={[required, selectValidation2x20]}
        />
        <Field
          size={size}
          options={options.color}
          name={COLOR_FIELD}
          className="col-12 mb-2"
          placeholder="Choose color"
          isCreatable
          disabled={getOptionListLoading || addCarLoading}
          component={Select}
          validate={[required, selectValidation2x20]}
          warn={[required, selectValidation2x20]}
        />
        <Field
          size={size}
          options={options.body}
          name={BODY_FIELD}
          className="col-12 mb-2"
          placeholder="Choose body"
          isCreatable
          disabled={getOptionListLoading || addCarLoading}
          component={Select}
          validate={[required, selectValidation2x20]}
          warn={[required, selectValidation2x20]}
        />
        <Field
          size={size}
          options={options.fuel}
          name={FUEL_FIELD}
          className="col-12 mb-2"
          placeholder="Choose fuel"
          isCreatable
          disabled={getOptionListLoading || addCarLoading}
          component={Select}
          validate={[required, selectValidation2x20]}
          warn={[required, selectValidation2x20]}
        />
        <Field
          type="number"
          size={size}
          name={YEAR_FIELD}
          className="col-12 mb-2"
          placeholder="Type year..."
          disabled={getOptionListLoading || addCarLoading}
          component={Input}
          validate={[required, strLength4x4]}
          warn={[required, strLength4x4]}
        />
        <Field
          type="number"
          size={size}
          name={CAPACITY_FIELD}
          className="col-12 mb-2"
          placeholder="Type capacity..."
          disabled={getOptionListLoading || addCarLoading}
          component={Input}
          validate={[required, strLength4x4]}
          warn={[required, strLength4x4]}
        />
        <Field
          type="number"
          size={size}
          name={COST_FIELD}
          className="col-12 mb-2"
          placeholder="Type cost..."
          disabled={getOptionListLoading || addCarLoading}
          component={Input}
          validate={[required, strLength4x7]}
          warn={[required, strLength4x7]}
        />
        <Field
          size={size}
          name={DESCRIPTION_FIELD}
          className="col-12 mb-2"
          placeholder="Type description..."
          disabled={getOptionListLoading || addCarLoading}
          component={Input}
          validate={[required, strLength5x100]}
          warn={[required, strLength5x100]}
        />
        <Field
          input={{
            onChange: files => {
              change(IMAGES_FIELD, [...imagesValue, files[0]]);
            },
          }}
          name={IMAGES_FIELD}
          size={size}
          className="col-12 mb-2"
          placeholder={`Upload image | Loaded: ${imagesValue.length}`}
          disabled={getOptionListLoading || addCarLoading}
          component={FileInput}
          validate={[required]}
          warn={[required]}
        />
        <Button
          size={size}
          className="col-12 mb-2"
          disabled={getOptionListLoading || addCarLoading}
          type="submit"
          name={
            getOptionListLoading || addCarLoading ? 'Adding...' : 'Add auto'
          }
        />
      </form>
    </div>
  );
};

AddCarForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  addCar: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  options: PropTypes.object,
  getOptionListLoading: PropTypes.bool,
  addCarLoading: PropTypes.bool,
  brandValue: PropTypes.object,
  reset: PropTypes.func,
  getManufacturerWithModelsList: PropTypes.func,
  imagesValue: PropTypes.array,
};

AddCarForm = reduxForm({
  form: ADD_CAR_FORM,
})(AddCarForm);

const selector = formValueSelector(ADD_CAR_FORM);

AddCarForm = connect(state => {
  const brandValue = selector(state, BRAND_FIELD);
  const imagesValue = selector(state, IMAGES_FIELD);

  return {
    brandValue,
    imagesValue,
  };
})(AddCarForm);

export default AddCarForm;
