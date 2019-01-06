import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from 'routes-config';

import Products from 'containers/Products';

import NotFoundPage from '../NotFoundPage';
import HomePage from '../HomePage';
import Header from '../Header';

const AppRouting = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path={routes.homepage()} component={HomePage} />
        <Route exact path={routes.products()} component={Products} />
        <Route path={routes.products(':product')} component={Products} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouting;
