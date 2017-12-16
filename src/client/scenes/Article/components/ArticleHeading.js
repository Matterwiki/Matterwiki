import React from "react";

import { Heading } from "ui";

const LastUpdatedDate = ({ date }) =>
  <span>
    Last updated on {new Date(date.replace(" ", "T")).toDateString()}
  </span>;

const EditedBy = ({ name }) =>
  <span>
    by <b>{name}</b>
  </span>;

const ArticleHeading = ({ children, date, editedBy }) =>
  <div>
    <Heading size="6">{children}</Heading>
    {date && <LastUpdatedDate date={date} />}&nbsp;
    {editedBy && <EditedBy name={editedBy} />}
  </div>;

export default ArticleHeading;
