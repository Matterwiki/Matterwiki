import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './static/app.jsx';
import Home from './static/home.jsx';
import Login from './static/login.jsx';
import About from './static/about.jsx';
import Product from './static/product.jsx';
import Article from './static/article.jsx';
import NewArticle from './static/new.jsx';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="home" component={Home}/>
      <Route path="about" component={About}/>
      <Route path="product" component={Product}/>
      <Route path="article/new" component={NewArticle}/>
      <Route path="article/:articleId" component={Article}/>
    </Route>
  </Router>
, document.body);
