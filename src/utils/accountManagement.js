import { responseHandler } from 'utils/responseManagement';
import { DEFAULT_HEADERS, METHODS } from './constants';

export const loginUtil = async data => {
  const response = await fetch('/login', {
    method: METHODS.POST,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      username: data.email,
      password: data.password,
    }),
  });

  const userData = await responseHandler(response);

  return userData;
};

export const sendVerificationLetterUtil = async () => {
  const response = await fetch('/send-verification-email');
  await responseHandler(response);
};

export const logoutUtil = async () => {
  const response = await fetch('/logout');
  await responseHandler(response);
};

export const confirmEmail = async url => {
  const response = await fetch(url);

  try {
    await responseHandler(response);
  } catch (err) {
    console.log(err);
  }
};

export const getUserDataUtil = async () => {
  const response = await fetch('/getuserdata');
  const responseJson = await response.json();

  if (response.status === 200) {
    return responseJson;
  }

  return null;
};

export const signupUtil = async data => {
  const response = await fetch('/registr', {
    method: METHODS.POST,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      email: data.email,
      username: data.username,
      password: data.password,
    }),
  });

  await responseHandler(response);
};

export const recoverPasswordUtil = async data => {
  const response = await fetch('/recover-password', {
    method: METHODS.POST,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      email: data.email,
    }),
  });

  await responseHandler(response);
};

export const changePasswordUtil = async data => {
  const response = await fetch('/change-password', {
    method: METHODS.POST,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      password2: data.password2,
    }),
  });

  await responseHandler(response);
};
