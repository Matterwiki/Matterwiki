import React from "react";

import { List } from "ui";

import Loader from "ui/loader";
import ArticlesListItem from "./components/ArticlesListItem";
import NoArticlesFound from "./components/NoArticlesFound";

const ArticlesList = props => {
  const { articles } = props;

  // TODO Do something about this.
  //      We need the Loader to be a HOC, so that we can abstract the logic away into it
  if (!articles) {
    return <Loader message="Loading articles" />;
  }
  if (!articles.length) {
    return <NoArticlesFound />;
  }
  return (
    <List>{articles.map(article => <ArticlesListItem key={article.id} article={article} />)}</List>
  );
};

export default ArticlesList;
