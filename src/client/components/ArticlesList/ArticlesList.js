import React from "react";

import { List, HelpBlock } from "ui";

import Loader from "components/Loader/Loader";
import ArticlesListItem from "./components/ArticlesListItem";

const ArticlesList = props => {
  const { articles } = props;

  // TODO Do something about this.
  //      We need the Loader to be a HOC, so that we can abstract the logic away into it
  if (!articles) {
    return <Loader message="Loading articles" />;
  }
  if (!articles.length) {
    return <HelpBlock textAlign="center">There are no articles under this topic</HelpBlock>;
  }
  return (
    <List>{articles.map(article => <ArticlesListItem key={article.id} article={article} />)}</List>
  );
};

export default ArticlesList;
