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
import ArticleHistory from './static/history.jsx';
import Admin from './static/admin.jsx';

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="home" component={Home}/>
      <Route path="login" component={Login}/>
      <Route path="about" component={About}/>
      <Route path="product" component={Product}/>
      <Route path="article/new" component={NewArticle}/>
      <Route path="article/edit/:articleId" component={EditArticle}/>
      <Route path="article/history/:articleId" component={ArticleHistory}/>
      <Route path="article/:articleId" component={Article}/>
      <Route path="admin" component={Admin}/>
    </Route>
  </Router>
, document.getElementById('app'));
