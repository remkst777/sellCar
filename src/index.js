import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

import configureStore from './configureStore';
import AppRouting from './components/AppRouting';

import './reset-styles.css';
import './global-styles.css';

window.$ = $;

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppRouting />
  </Provider>,
  document.getElementById('root'),
);
