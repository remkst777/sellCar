import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import {
  required,
  validateEmail,
  strLength5x20,
} from 'components/FormFields/validate';

import Input from 'components/FormFields/Input';
import Button from 'components/FormFields/Button';

import {
  SIGNUP_FORM_EMAIL_FIELD,
  SIGNUP_FORM_PASSWORD_FIELD,
  SIGNUP_FORM_USERNAME,
} from './constants';

const SignUpForm = ({ loading, handleSubmit, submitRegistr, size }) => (
  <div>
    <form className="row" onSubmit={handleSubmit(submitRegistr)}>
      <Field
        size={size}
        disabled={loading}
        name={SIGNUP_FORM_EMAIL_FIELD}
        className="col-12"
        placeholder="Email"
        component={Input}
        validate={[required, validateEmail]}
        warn={[required, validateEmail]}
      />
      <Field
        size={size}
        disabled={loading}
        name={SIGNUP_FORM_PASSWORD_FIELD}
        className="col-12"
        type="password"
        placeholder="Password"
        component={Input}
        validate={[required, strLength5x20]}
        warn={[required, strLength5x20]}
      />
      <Field
        size={size}
        disabled={loading}
        name={SIGNUP_FORM_USERNAME}
        className="col-12"
        placeholder="Username"
        component={Input}
        validate={[required, strLength5x20]}
        warn={[required, strLength5x20]}
      />
      <Button
        size={size}
        disabled={loading}
        className="col-12"
        type="submit"
        name={loading ? 'Sign Up...' : 'Sign Up'}
      />
    </form>
  </div>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitRegistr: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'SignUpForm',
})(SignUpForm);
