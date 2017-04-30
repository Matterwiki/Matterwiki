import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App/App";
import Home from "./components/Home/index";
import Login from "./components/Login/index";
// TODO try to abstract common `Article` component with different children ie., New, Edit, View
import ViewArticle from "./components/Article/ViewArticle";
import NewArticle from "./components/Article/NewArticle";
import EditArticle from "./components/Article/EditArticle";
import Archives from "./components/Archives/index.jsx";
import Search from "./components/Search/search.jsx";
import Admin from "./components/Dashboard/index.jsx";
import Setup from "./components/Setup/index";
import EditTopic from "./components/Dashboard/Topics/edit_topics.jsx";
import EditUser from "./components/Dashboard/Users/edit_users.jsx";

export default function() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="home" component={Home} />
      <Route path="login" component={Login} />
      <Route path="article/:articleId" component={ViewArticle} />
      <Route path="article/new" component={NewArticle} />
      <Route path="article/edit/:articleId" component={EditArticle} />
      <Route path="article/history/:articleId" component={Archives} />
      <Route path="admin" component={Admin} />
      <Route path="topic/edit/:topicId" component={EditTopic} />
      <Route path="user/edit/:userId" component={EditUser} />
      <Route path="search" component={Search} />
      <Route path="setup" component={Setup} />
    </Route>
  );
}
