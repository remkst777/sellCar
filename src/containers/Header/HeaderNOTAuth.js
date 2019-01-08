import React from 'react';
import { MODAL_DIALOG_LOGIN_ID } from 'containers/Login/constants';
import { MODAL_DIALOG_SIGN_UP_ID } from 'components/SignUp/constants';

const HeaderNOTAuth = ({ showModal }) => [
  <li onClick={showModal} data-modalType={MODAL_DIALOG_LOGIN_ID} key="login">
    Login
  </li>,
  <li onClick={showModal} data-modalType={MODAL_DIALOG_SIGN_UP_ID} key="signup">
    Sign Up
  </li>,
];

export default HeaderNOTAuth;
