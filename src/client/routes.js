import React from "react";
import { Route, IndexRoute } from "react-router";

// TODO Main route is the parent of all routes. Find another way to do this!
import Main from "./scenes/Main/index";
import Login from "./scenes/Main/scenes/Login/index";
import Setup from "./scenes/Main/scenes/Setup/index";
import Search from "./scenes/Main/scenes/Search/index";
import Home from "./scenes/Main/scenes/Home/index";

// Article routes
import Article from "./scenes/Main/scenes/Article/index";
import {
  NewArticle,
  ViewArticle,
  EditArticle,
  Archives
} from "./scenes/Main/scenes/Article/scenes/index";

// Admin routes
import Admin from "./scenes/Main/scenes/Admin/index";
import {
  ManageTopics,
  ManageUsers,
  LogoUpload
} from "./scenes/Main/scenes/Admin/scenes/index";

const routes = () => (
  <Route path="/" component={Main}>
    <IndexRoute component={Login} />
    <Route path="home" component={Home} />
    <Route path="login" component={Login} />
    <Route path="article" component={Article}>
      <Route path="new" component={NewArticle} />
      <Route path=":articleId" component={ViewArticle} />
      <Route path="edit/:articleId" component={EditArticle} />
      <Route path="history/:articleId" component={Archives} />
    </Route>
    <Route path="admin" component={Admin}>
      <IndexRoute component={ManageUsers} />
      <Route path="topics" component={ManageTopics} />
      <Route path="users" component={ManageUsers} />
      <Route path="design" component={LogoUpload} />
    </Route>
    <Route path="search" component={Search} />
    <Route path="setup" component={Setup} />
  </Route>
);

export default routes;
