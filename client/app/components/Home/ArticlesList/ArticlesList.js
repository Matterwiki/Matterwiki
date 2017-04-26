import React from "react";
import { HelpBlock } from "react-bootstrap";

import Loader from "Loader/loader.jsx";
import ArticlesListItem from "./ArticlesListItem";

const ArticlesList = props => {
  const { articles } = props;

  return !articles
    ? <Loader message="Loading articles"/>
    : !articles.length
        ? <HelpBlock bsClass="center-align">
            There are no articles under this topic
          </HelpBlock>
        : <div className="article-list">
            {articles.map(article => (
              <ArticlesListItem key={article.id} article={article} />
            ))}
          </div>;
};

export default ArticlesList;
