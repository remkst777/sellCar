import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from 'routes-config';

import Loader from 'components/Loader/WidthHeightCentered';

const Cart = React.lazy(() => import('containers/Cart'));
const Cars = React.lazy(() => import('containers/Cars'));
const Header = React.lazy(() => import('containers/Header'));
const Profile = React.lazy(() => import('containers/Profile'));
const SingleCar = React.lazy(() => import('containers/SingleCar'));

const NotFoundPage = React.lazy(() => import('components/NotFoundPage'));
const HomePage = React.lazy(() => import('components/HomePage'));
const AboutUs = React.lazy(() => import('components/AboutUs'));

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
      <Suspense fallback={<Loader size="lg" />}>
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
          <Route
            exact
            path={carsRoute}
            render={props => Wrapper(Cars, props)}
          />
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
      </Suspense>
    </div>
  </BrowserRouter>
);

export default AppRouting;
