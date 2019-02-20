import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from 'routes-config';

import Cart from 'containers/Cart';
import Cars from 'containers/Cars';
import Login from 'containers/Login';
import Header from 'containers/Header';
import Profile from 'containers/Profile';
import SingleCar from 'containers/SingleCar';

import SignUp from 'components/SignUp';
import ForgotPassword from 'components/ForgotPassword';
import ChangePassword from 'components/ChangePassword';
import NotFoundPage from 'components/NotFoundPage';
import HomePage from 'components/HomePage';
import AboutUs from 'components/AboutUs';

const Wrapper = (WrappedComponent, props) => (
  <div className="py-3">
    <WrappedComponent {...props} />
  </div>
);

const registrToken = routes.registr(':token');
const carsRoute = routes.cars(':auto');
const singleCarRoute = routes.singleCar(':brand', ':id');

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
          path={routes.about}
          render={props => Wrapper(AboutUs, props)}
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
          path={singleCarRoute}
          render={props => Wrapper(SingleCar, props)}
        />
        <Route
          path={routes.profile}
          render={props => Wrapper(Profile, props)}
        />
        <Route path={routes.cart} render={props => Wrapper(Cart, props)} />
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
