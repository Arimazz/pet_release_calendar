import React from 'react';
import ReactDOM from 'react-dom';

import Router from './screens/Router/Router';
import {Provider} from 'react-redux'
import {store} from './store/initStore'

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

