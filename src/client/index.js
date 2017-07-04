import React from 'react';
import { AppContainer } from 'react-hot-loader';
import {render} from 'react-dom';
import { Router, hashHistory } from 'react-router';

import routes from './routes.js';

// For `Promise`, Array.from and other fun stuff
// TODO replace this with core-js and use the stuff you just need
import "babel-polyfill";

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
  module.hot.accept('./routes.js', () => {
    const routeChanges = require('./routes.js').default;
    renderApp(routeChanges);
  })
}
