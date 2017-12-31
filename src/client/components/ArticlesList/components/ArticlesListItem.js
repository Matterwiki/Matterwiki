import React from "react";
import { Link } from "react-router-dom";

import { ListItem, ListItemHeader, ListItemBody, Icon } from "ui";
import { Hide } from "ui/utils";

const ArticlesListItem = props => {
  const { article } = props;
  const articleLink = `/article/${article.id}`;

  return (
    <ListItem>
      <ListItemHeader size="4">
        <Link to={articleLink}>{article.title}</Link>
      </ListItemHeader>
      <ListItemBody>
        <Icon type="clock" size="12" />&nbsp; <Hide small>Last updated on&nbsp;</Hide>
        {new Date(article.updated_at.replace(" ", "T")).toDateString()} <Hide small>by &nbsp;</Hide>
        <Icon type="user" size="12" />&nbsp;
        {article.modifiedByUser.name}
      </ListItemBody>
    </ListItem>
  );
};

export default ArticlesListItem;
