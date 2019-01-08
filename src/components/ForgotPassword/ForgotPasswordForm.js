import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { required, validateEmail } from 'components/FormFields/validate';

import Input from 'components/FormFields/Input';
import Button from 'components/FormFields/Button';

import { FORGOT_PASSWORD_FORM_EMAIL_FIELD } from './constants';

const ForgotPasswordForm = ({
  loading,
  handleSubmit,
  submitForgotPassword,
  size,
}) => (
  <div>
    <form className="row" onSubmit={handleSubmit(submitForgotPassword)}>
      <Field
        size={size}
        disabled={loading}
        name={FORGOT_PASSWORD_FORM_EMAIL_FIELD}
        className="col-12"
        placeholder="Email"
        component={Input}
        validate={[required, validateEmail]}
        warn={[required, validateEmail]}
      />
      <Button
        size={size}
        disabled={loading}
        className="col-12"
        type="submit"
        name={loading ? 'Recovering...' : 'Recover'}
      />
    </form>
  </div>
);

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitForgotPassword: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'ForgotPasswordForm',
})(ForgotPasswordForm);
