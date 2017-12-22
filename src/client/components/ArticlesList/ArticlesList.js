import React from "react";
import { HelpBlock } from "react-bootstrap";

import Loader from "components/Loader/Loader";
import ArticlesListItem from "./components/ArticlesListItem";

import "./ArticlesList.css";

const ArticlesList = props => {
  const { articles } = props;

  // TODO Do something about this.
  //      We need the Loader to be a HOC, so that we can abstract the logic away into it
  if (!articles) {
    return <Loader message="Loading articles" />;
  }
  if (!articles.length) {
    return <HelpBlock className="center-align">There are no articles under this topic</HelpBlock>;
  }
  return (
    <div className="article-list">
      {articles.map(article => <ArticlesListItem key={article.id} article={article} />)}
    </div>
  );
};

export default ArticlesList;
