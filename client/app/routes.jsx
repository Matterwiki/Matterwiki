import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import Article from './components/article.jsx';
import NewArticle from './components/new.jsx';
import EditArticle from './components/edit.jsx';
import ArticleHistory from './components/history.jsx';
import Search from './components/search.jsx';
import Admin from './components/admin.jsx';
import Setup from './components/setup.jsx';
import EditTopic from './components/edit_topics.jsx';
import EditUser from './components/edit_users.jsx';


export default function () {
	return (
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
			<Route path="search" component={Search}/>
		  <Route path="setup" component={Setup}/>
		</Route>
	);
};
