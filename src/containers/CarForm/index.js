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
} from 'containers/Cars/constants';

/* eslint import/no-mutable-exports: 0 */
let CarForm = ({
  handleSubmit,
  size,
  submitCar,
  change,
  options,
  getOptionListLoading,
  submitCarLoading,
  brandValue,
  reset,
  getManufacturerWithModelsList,
  form,
  pristine,
  imagesValue = [],
}) => {
  const selectBrand = v => {
    reset();
    getManufacturerWithModelsList(v.value, form);
  };

  return (
    <div>
      <form className="row" onSubmit={handleSubmit(submitCar)}>
        <Field
          onChange={selectBrand}
          options={options.brand}
          size={size}
          name={BRAND_FIELD}
          className="col-12 mb-2"
          placeholder="Choose brand"
          isCreatable
          disabled={getOptionListLoading || submitCarLoading}
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
          disabled={!brandValue || getOptionListLoading || submitCarLoading}
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
          disabled={getOptionListLoading || submitCarLoading}
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
          disabled={getOptionListLoading || submitCarLoading}
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
          disabled={getOptionListLoading || submitCarLoading}
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
          disabled={getOptionListLoading || submitCarLoading}
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
          disabled={getOptionListLoading || submitCarLoading}
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
          disabled={getOptionListLoading || submitCarLoading}
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
          disabled={getOptionListLoading || submitCarLoading}
          component={Input}
          validate={[required, strLength4x7]}
          warn={[required, strLength4x7]}
        />
        <Field
          size={size}
          name={DESCRIPTION_FIELD}
          className="col-12 mb-2"
          placeholder="Type description..."
          disabled={getOptionListLoading || submitCarLoading}
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
          disabled={getOptionListLoading || submitCarLoading}
          component={FileInput}
          validate={[required]}
          warn={[required]}
        />
        <Button
          size={size}
          className="col-12 mb-2"
          disabled={pristine || getOptionListLoading || submitCarLoading}
          type="submit"
          name={
            getOptionListLoading || submitCarLoading
              ? 'Submitting...'
              : 'Submit'
          }
        />
      </form>
    </div>
  );
};

CarForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  submitCar: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  options: PropTypes.object,
  form: PropTypes.string,
  pristine: PropTypes.bool,
  getOptionListLoading: PropTypes.bool,
  submitCarLoading: PropTypes.bool,
  brandValue: PropTypes.object,
  reset: PropTypes.func,
  getManufacturerWithModelsList: PropTypes.func,
  imagesValue: PropTypes.array,
};

CarForm = reduxForm({
  enableReinitialize: true,
})(CarForm);

CarForm = connect((state, props) => {
  const selector = formValueSelector(props.form);

  const brandValue = selector(state, BRAND_FIELD);
  const imagesValue = selector(state, IMAGES_FIELD);

  const initialValues = {
    [IMAGES_FIELD]: props.imagesInitial,
    [BRAND_FIELD]: props.brandInitial,
    [MODEL_FIELD]: props.modelInitial,
    [MANUFACTURER_FIELD]: props.manufacturerInitial,
    [COLOR_FIELD]: props.colorInitial,
    [BODY_FIELD]: props.bodyInitial,
    [FUEL_FIELD]: props.fuelInitial,
    [YEAR_FIELD]: props.yearInitial,
    [CAPACITY_FIELD]: props.capacityInitial,
    [COST_FIELD]: props.costInitial,
    [DESCRIPTION_FIELD]: props.descriptionInitial,
  };

  return {
    brandValue,
    imagesValue,
    initialValues,
  };
})(CarForm);

export default React.memo(CarForm);
