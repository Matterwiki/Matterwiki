import React from "react";

const LastUpdatedDate = ({ date }) => (
  <div className="single-article-meta">
    Last updated on {new Date(date.replace(" ", "T")).toDateString()}
  </div>
);

const EditedBy = ({ name }) => (
  <div className="single-article-meta">
    Edited by <b>{name}</b>
  </div>
);

const ArticleHeading = ({ children, date, editedBy }) => (
  <div className="article-heading">
    <h1 className="single-article-title">{children}</h1>
    {date && <LastUpdatedDate date={date} />}
    {editedBy && <EditedBy name={editedBy} />}
  </div>
);

export default ArticleHeading;
