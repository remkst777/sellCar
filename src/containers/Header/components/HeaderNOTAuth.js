import React from 'react';
import Login from 'containers/Login';
import SignUp from 'components/SignUp';

const HeaderNOTAuth = () => (
  <React.Fragment>
    <Login element="li" />
    <SignUp element="li" />
  </React.Fragment>
);

export default React.memo(HeaderNOTAuth);
