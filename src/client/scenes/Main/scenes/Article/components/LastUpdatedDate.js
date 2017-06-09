import React from "react";

const LastUpdatedDate = ({ date }) => (
  <div className="single-article-meta">
    Last updated on
    {new Date(date.replace(" ", "T")).toDateString()}
  </div>
);

export default LastUpdatedDate;
