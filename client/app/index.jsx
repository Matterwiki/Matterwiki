import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';

import App from './static/app.jsx';
import Home from './static/home.jsx';
import Login from './static/login.jsx';
import About from './static/about.jsx';
import Product from './static/product.jsx';
import Article from './static/article.jsx';
import NewArticle from './static/new.jsx';
import EditArticle from './static/edit.jsx';

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="home" component={Home}/>
      <Route path="home" component={Home}/>
      <Route path="login" component={Login}/>
      <Route path="about" component={About}/>
      <Route path="product" component={Product}/>
      <Route path="article/new" component={NewArticle}/>
      <Route path="article/edit/:articleId" component={EditArticle}/>
      <Route path="article/:articleId" component={Article}/>
    </Route>
  </Router>
, document.getElementById('app'));
