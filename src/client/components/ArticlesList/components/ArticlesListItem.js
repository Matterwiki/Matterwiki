import React from "react";
import { Link } from "react-router-dom";

const ArticlesListItem = props => {
  const { article } = props;
  const articleLink = `/article/${article.id}`;

  return (
    <div className="article-item">
      <div className="article-item-title">
        <Link to={articleLink}>{article.title}</Link>
      </div>
      <div className="article-item-description">
        {`Last updated on ${new Date(article.updated_at.replace(" ", "T")).toDateString()}`}
      </div>
      <hr className="article-separator" />
    </div>
  );
};

export default ArticlesListItem;
