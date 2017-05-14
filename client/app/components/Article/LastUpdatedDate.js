import React from "react";

const LastUpdatedDate = props => (
  <div className="single-article-meta">
    Last updated on
    {new Date(props.date.replace(" ", "T")).toDateString()}
  </div>
);

export default LastUpdatedDate;