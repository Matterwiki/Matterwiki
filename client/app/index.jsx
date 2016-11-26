import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './static/app.jsx';
import Home from './static/home.jsx';
import Login from './static/login.jsx';
import About from './static/about.jsx';
import Product from './static/product.jsx';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="about" component={About}/>
      <Route path="product" component={Product}/>

    </Route>
  </Router>
, document.body);
