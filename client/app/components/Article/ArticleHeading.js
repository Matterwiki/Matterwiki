import React from "react";

const LastUpdatedDate = props => (
  <div className="single-article-meta">
    Last updated on
    {new Date(props.date.replace(" ", "T")).toDateString()}
  </div>
);

const EditedBy = props => (
  <div className="single-article-meta">
    Edited by <b>{props.editedBy}</b>
  </div>
);

const ArticleHeading = props => (
  <div className="article-heading">
    <h1 className="single-article-title">
      {props.children}
    </h1>
    {props.date && <LastUpdatedDate date={props.date} />}
    {props.editedBy && <EditedBy name={props.editedBy} />}
  </div>
);

export default ArticleHeading;
