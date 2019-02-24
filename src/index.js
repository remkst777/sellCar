import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

import AppRouting from 'components/AppRouting';
import AccountProvider from 'containers/AccountProvider';
import DataCacheProvider from 'containers/DataCacheProvider';

import configureStore from './configureStore';

import './reset-styles.css';
import './global-styles.css';

window.$ = $;

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AccountProvider>
      <DataCacheProvider>
        <AppRouting />
      </DataCacheProvider>
    </AccountProvider>
  </Provider>,
  document.getElementById('root'),
);
