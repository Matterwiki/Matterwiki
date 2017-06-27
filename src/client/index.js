import React from 'react';
import { AppContainer } from 'react-hot-loader';
import {render} from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Main from "./scenes/Main/Main";

// import routes from './routes.js';

const renderApp = () => {
  render(
    <AppContainer>
      <HashRouter>
        <Route exact path="/" component={Main} />
      </HashRouter>
    </AppContainer>,
    document.getElementById('app')
  )
};


renderApp();

// react HMR
// if(module.hot) {
//   module.hot.accept('./routes.js', () => {
//     const routeChanges = require('./routes.js').default;
//     renderApp(routeChanges);
//   })
// }
