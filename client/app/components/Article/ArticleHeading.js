import React from "react";

const LastUpdatedDate = props => (
  <div className="single-article-meta">
    Last updated on
    {new Date(props.date.replace(" ", "T")).toDateString()}
  </div>
);

const ArticleHeading = props => (
  <div className="article-heading">
    <h1 className="single-article-title">
      {props.children}
    </h1>
    <LastUpdatedDate date={props.date} />
  </div>
);

export default ArticleHeading;
