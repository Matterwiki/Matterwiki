import React from "react";
import { Link } from "react-router-dom";

import { ListItem, ListItemHeader, ListItemBody } from "ui";

const ArticlesListItem = props => {
  const { article } = props;
  const articleLink = `/article/${article.id}`;

  return (
    <ListItem>
      <ListItemHeader size="4">
        <Link to={articleLink}>
          {article.title}
        </Link>
      </ListItemHeader>
      <ListItemBody>
        {`Last updated on ${new Date(
          article.updated_at.replace(" ", "T")
        ).toDateString()}`}
      </ListItemBody>
    </ListItem>
  );
};

export default ArticlesListItem;
