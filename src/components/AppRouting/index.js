import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from 'routes-config';

import Products from 'containers/Products';
import Login from 'containers/Login';
import Header from 'containers/Header';
import Profile from 'containers/Profile';

import SignUp from 'components/SignUp';
import ForgotPassword from 'components/ForgotPassword';
import ChangePassword from 'components/ChangePassword';
import NotFoundPage from 'components/NotFoundPage';
import HomePage from 'components/HomePage';

const AppRouting = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path={routes.homepage()} component={HomePage} />
        <Route exact path={routes.registr(':token')} component={HomePage} />
        <Route exact path={routes.products()} component={Products} />
        <Route path={routes.products(':product')} component={Products} />
        <Route path={routes.profile()} component={Profile} />
        <Route component={NotFoundPage} />
      </Switch>

      <Login />
      <SignUp />
      <ForgotPassword />
      <ChangePassword />
    </div>
  </BrowserRouter>
);

export default AppRouting;
