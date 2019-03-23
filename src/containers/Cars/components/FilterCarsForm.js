import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import Select from 'components/FormFields/Select';
import Button from 'components/FormFields/Button';
import Input from 'components/FormFields/Input';

import {
  BRAND_FIELD,
  MODEL_FIELD,
  MANUFACTURER_FIELD,
  COLOR_FIELD,
  BODY_FIELD,
  FUEL_FIELD,
  MIN_YEAR_FILTER_FIELD,
  MAX_YEAR_FILTER_FIELD,
  MIN_CAPACITY_FILTER_FIELD,
  MAX_CAPACITY_FILTER_FIELD,
  MIN_COST_FILTER_FIELD,
  MAX_COST_FILTER_FIELD,
  FILTER_CARS_FORM,
} from '../constants';

/* eslint import/no-mutable-exports: 0 */
let FilterCarsForm = ({
  handleSubmit,
  size,
  options,
  getOptionListLoading,
  loadCarsLoading,
  brandValue,
  reset,
  change,
  ranges,
  getManufacturerWithModelsList,
}) => {
  const selectBrand = v => {
    reset();
    getManufacturerWithModelsList(v.value, FILTER_CARS_FORM);
  };

  const selectManufacturer = () => {
    change(BRAND_FIELD, null);
    change(MODEL_FIELD, null);
  };

  return (
    <div>
      <form className="row" onSubmit={handleSubmit}>
        <Field
          label="brand"
          placeholder="Choose brand"
          allOption
          onChange={selectBrand}
          options={options.brand}
          size={size}
          name={BRAND_FIELD}
          className="col-12 mb-2"
          disabled={getOptionListLoading || loadCarsLoading}
          component={Select}
        />
        <Field
          label="model"
          size={size}
          allOption
          options={options.model}
          name={MODEL_FIELD}
          className="col-12 mb-2"
          placeholder="Choose model"
          disabled={!brandValue || getOptionListLoading || loadCarsLoading}
          component={Select}
        />
        <Field
          label="manufacturer"
          onChange={selectManufacturer}
          size={size}
          allOption
          options={options.manufacturer}
          name={MANUFACTURER_FIELD}
          className="col-12 mb-2"
          placeholder="Choose manufacturer"
          disabled={getOptionListLoading || loadCarsLoading}
          component={Select}
        />
        <Field
          label="color"
          size={size}
          allOption
          options={options.color}
          name={COLOR_FIELD}
          className="col-12 mb-2"
          placeholder="Choose color"
          disabled={getOptionListLoading || loadCarsLoading}
          component={Select}
        />
        <Field
          label="body"
          size={size}
          allOption
          options={options.body}
          name={BODY_FIELD}
          className="col-12 mb-2"
          placeholder="Choose body"
          disabled={getOptionListLoading || loadCarsLoading}
          component={Select}
        />
        <Field
          label="fuel"
          size={size}
          allOption
          options={options.fuel}
          name={FUEL_FIELD}
          className="col-12 mb-2"
          placeholder="Choose fuel"
          disabled={getOptionListLoading || loadCarsLoading}
          component={Select}
        />

        <div className="d-flex">
          <Field
            label="min year"
            type="number"
            size={size}
            name={MIN_YEAR_FILTER_FIELD}
            className="col-6 mb-2"
            placeholder={ranges.min_year || 'min year'}
            disabled={getOptionListLoading || loadCarsLoading}
            component={Input}
          />
          <Field
            label="max year"
            type="number"
            size={size}
            name={MAX_YEAR_FILTER_FIELD}
            className="col-6 mb-2"
            placeholder={ranges.max_year || 'max year'}
            disabled={getOptionListLoading || loadCarsLoading}
            component={Input}
          />
        </div>

        <div className="d-flex">
          <Field
            label="min capacity, cm3"
            type="number"
            size={size}
            name={MIN_CAPACITY_FILTER_FIELD}
            className="col-6 mb-2"
            placeholder={ranges.min_capacity || 'min capacity'}
            disabled={getOptionListLoading || loadCarsLoading}
            component={Input}
          />
          <Field
            label="max capacity, cm3"
            type="number"
            size={size}
            name={MAX_CAPACITY_FILTER_FIELD}
            className="col-6 mb-2"
            placeholder={ranges.max_capacity || 'max capacity'}
            disabled={getOptionListLoading || loadCarsLoading}
            component={Input}
          />
        </div>

        <div className="d-flex">
          <Field
            label="min cost, $"
            type="number"
            size={size}
            name={MIN_COST_FILTER_FIELD}
            className="col-6 mb-2"
            placeholder={ranges.min_cost || 'min cost'}
            disabled={getOptionListLoading || loadCarsLoading}
            component={Input}
          />
          <Field
            label="max cost, $"
            type="number"
            size={size}
            name={MAX_COST_FILTER_FIELD}
            className="col-6 mb-2"
            placeholder={ranges.max_cost || 'max cost'}
            disabled={getOptionListLoading || loadCarsLoading}
            component={Input}
          />
        </div>

        <Button
          size={size}
          className="col-12 mb-2"
          disabled={getOptionListLoading || loadCarsLoading}
          type="submit"
          name={getOptionListLoading || loadCarsLoading ? 'Finding...' : 'Find'}
        />
      </form>
    </div>
  );
};

FilterCarsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  getOptionListLoading: PropTypes.bool.isRequired,
  loadCarsLoading: PropTypes.bool.isRequired,
  brandValue: PropTypes.object,
  reset: PropTypes.func,
  change: PropTypes.func,
  getManufacturerWithModelsList: PropTypes.func,
  ranges: PropTypes.object,
};

FilterCarsForm = reduxForm({
  form: FILTER_CARS_FORM,
})(FilterCarsForm);

const selector = formValueSelector(FILTER_CARS_FORM);

FilterCarsForm = connect((state, props) => {
  const brandValue = selector(state, BRAND_FIELD);

  return {
    brandValue,
    onSubmit: props.filterCars,
  };
})(FilterCarsForm);

export default React.memo(FilterCarsForm);
