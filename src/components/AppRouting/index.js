import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from 'routes-config';

import Cars from 'containers/Cars';
import Login from 'containers/Login';
import Header from 'containers/Header';
import Profile from 'containers/Profile';

import SignUp from 'components/SignUp';
import ForgotPassword from 'components/ForgotPassword';
import ChangePassword from 'components/ChangePassword';
import NotFoundPage from 'components/NotFoundPage';
import HomePage from 'components/HomePage';

const Wrapper = (WrappedComponent, props) => (
  <div className="py-3">
    <WrappedComponent {...props} />
  </div>
);

const registrToken = routes.registr(':token');
const carsRoute = routes.cars(':auto');

const AppRouting = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path={routes.homepage}
          render={props => Wrapper(HomePage, props)}
        />
        <Route
          exact
          path={registrToken}
          render={props => Wrapper(HomePage, props)}
        />
        <Route
          exact
          path={routes.anotherCar}
          render={props => Wrapper(Cars, props)}
        />
        <Route exact path={carsRoute} render={props => Wrapper(Cars, props)} />
        <Route
          path={routes.profile}
          render={props => Wrapper(Profile, props)}
        />
        <Route render={props => Wrapper(NotFoundPage, props)} />
      </Switch>

      <Login />
      <SignUp />
      <ForgotPassword />
      <ChangePassword />
    </div>
  </BrowserRouter>
);

export default AppRouting;
