import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';

import App from './static/app.jsx';
import Home from './static/home.jsx';
import Login from './static/login.jsx';
import Article from './static/article.jsx';
import NewArticle from './static/new.jsx';
import EditArticle from './static/edit.jsx';
import ArticleHistory from './static/history.jsx';
import Admin from './static/admin.jsx';
import Setup from './static/setup.jsx';
import EditTopic from './static/edit_topics.jsx';
import EditUser from './static/edit_users.jsx';

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="home" component={Home}/>
      <Route path="login" component={Login}/>
        <Route path="article/new" component={NewArticle}/>
        <Route path="article/edit/:articleId" component={EditArticle}/>
      <Route path="article/history/:articleId" component={ArticleHistory}/>
      <Route path="article/:articleId" component={Article}/>
      <Route path="admin" component={Admin}/>
      <Route path="topic/edit/:topicId" component={EditTopic}/>
      <Route path="user/edit/:userId" component={EditUser}/>
      <Route path="setup" component={Setup}/>
    </Route>
  </Router>
, document.getElementById('app'));
