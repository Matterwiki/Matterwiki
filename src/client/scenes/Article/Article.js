import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Articles.css";

import { NewArticle, ViewArticle, EditArticle, Archives } from "./scenes/ArticleScenes";

const Article = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={`${match.url}/new`} component={NewArticle} />
      <Route exact path={`${match.url}/:articleId`} component={ViewArticle} />
      <Route exact path={`${match.url}/edit/:articleId`} component={EditArticle} />
      <Route exact path={`${match.url}/:articleId/history/`} component={Archives} />
    </Switch>
  </div>
);

export default Article;
