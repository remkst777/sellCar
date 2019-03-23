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
  LOGIN_FORM_EMAIL_FIELD,
  LOGIN_FORM_PASSWORD_FIELD,
} from '../constants';

const LoginForm = ({ loading, handleSubmit, submitLogin, size }) => (
  <div>
    <form className="row" onSubmit={handleSubmit(submitLogin)}>
      <Field
        size={size}
        disabled={loading}
        name={LOGIN_FORM_EMAIL_FIELD}
        className="col-12"
        placeholder="Email"
        component={Input}
        validate={[required, validateEmail]}
        warn={[required, validateEmail]}
      />
      <Field
        size={size}
        disabled={loading}
        name={LOGIN_FORM_PASSWORD_FIELD}
        className="col-12"
        type="password"
        placeholder="Password"
        component={Input}
        validate={[required, strLength5x20]}
        warn={[required, strLength5x20]}
      />
      <Button
        size={size}
        disabled={loading}
        className="col-12"
        type="submit"
        name={loading ? 'Login...' : 'Login'}
      />
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default React.memo(
  reduxForm({
    form: 'LoginForm',
  })(LoginForm),
);
