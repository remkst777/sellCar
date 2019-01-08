const imageValidation = value =>
  value && value[0] && value[0].size > 100000 ? 'Too much' : undefined;

const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? `Field length has to be between ${min} and ${max}`
    : undefined;

/* eslint no-useless-escape: 0 */
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email) ? 'Wrong email' : undefined;
};

const required = value => (!value ? 'Required field' : undefined);

const strLength5x20 = stringLength(5, 20);

export {
  imageValidation,
  stringLength,
  validateEmail,
  required,
  strLength5x20,
};
