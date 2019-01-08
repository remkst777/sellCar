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
  CHANGE_PASSWORD_FORM_EMAIL_FIELD,
  CHANGE_PASSWORD_FORM_PASSWORD_FIELD,
  CHANGE_PASSWORD_FORM_PASSWORD2_FIELD,
} from './constants';

const ChangePasswordForm = ({
  loading,
  handleSubmit,
  submitChangePassword,
  size,
}) => (
  <div>
    <form className="row" onSubmit={handleSubmit(submitChangePassword)}>
      <Field
        size={size}
        disabled={loading}
        name={CHANGE_PASSWORD_FORM_EMAIL_FIELD}
        className="col-12"
        placeholder="Email"
        component={Input}
        validate={[required, validateEmail]}
        warn={[required, validateEmail]}
      />
      <Field
        size={size}
        disabled={loading}
        name={CHANGE_PASSWORD_FORM_PASSWORD_FIELD}
        className="col-12"
        type="password"
        placeholder="Prev password"
        component={Input}
        validate={[required, strLength5x20]}
        warn={[required, strLength5x20]}
      />
      <Field
        size={size}
        disabled={loading}
        name={CHANGE_PASSWORD_FORM_PASSWORD2_FIELD}
        className="col-12"
        type="password"
        placeholder="New password"
        component={Input}
        validate={[required, strLength5x20]}
        warn={[required, strLength5x20]}
      />
      <Button
        size={size}
        disabled={loading}
        className="col-12"
        type="submit"
        name={loading ? 'Changing...' : 'Change password'}
      />
    </form>
  </div>
);

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitChangePassword: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'ChangePasswordForm',
})(ChangePasswordForm);
