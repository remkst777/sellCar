import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required } from '../FormFields/validate';

import Input from '../FormFields/Input';
import Button from '../FormFields/Button';

const SearchBasicForm = props => (
  <div>
    <form className="row" onSubmit={props.handleSubmit(props.submitSearch)}>
      <Field
        size={props.size}
        name={props.searchFieldName}
        className="col-12 col-md-10"
        placeholder="Type..."
        component={Input}
        validate={[required]}
        warn={[required]}
      />
      <Button
        size={props.size}
        className="d-none d-md-block col-md-2"
        type="submit"
        name="Go"
      />
    </form>
  </div>
);

SearchBasicForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitSearch: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  searchFieldName: PropTypes.string,
};

export default reduxForm({
  form: 'SearchBasicForm',
})(SearchBasicForm);
