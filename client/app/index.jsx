import React from 'react';
import { AppContainer } from 'react-hot-loader';
import {render} from 'react-dom';
import { Router, hashHistory } from 'react-router';

import routes from './routes.jsx';

const renderApp = (appRoutes) => {
  render(
    <AppContainer>
      <Router history={hashHistory}>
        {appRoutes()}
      </Router>
    </AppContainer>,
    document.getElementById('app')
  )
};


renderApp(routes);

// react HMR
if(module.hot) {
  module.hot.accept('./routes.jsx', () => {
    const routeChanges = require('./routes.jsx').default;
    renderApp(routeChanges);
  })
}
