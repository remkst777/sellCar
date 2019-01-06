const imageValidation = value =>
  value && value[0] && value[0].size > 100000 ? 'Too much' : undefined;

const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? 'Wrong field length'
    : undefined;

/* eslint no-useless-escape: 0 */
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email) ? 'Wrong email' : undefined;
};

const required = value => (!value ? 'Required field' : undefined);

const strLength20x100 = stringLength(20, 100);

export {
  imageValidation,
  stringLength,
  validateEmail,
  required,
  strLength20x100,
};
