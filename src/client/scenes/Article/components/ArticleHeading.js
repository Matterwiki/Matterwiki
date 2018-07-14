import React, { Children } from "react";

import { Heading, Icon } from "ui";
import { Hide, Flex } from "ui/utils";

const ArticleHeading = ({ article, children }) => (
  <div>
    <Heading size="6">{children}</Heading>
    <Flex alignItems="center">
      <Icon type="clock" size="12" />&nbsp;<Hide small>Last updated on&nbsp;</Hide>
      {new Date(article.updated_at.replace(" ", "T")).toDateString()}
      <Hide small>&nbsp;by&nbsp;</Hide>
      <Icon type="user" size="12" />
      {article.modifiedByUser.name}
    </Flex>
  </div>
);

export default ArticleHeading;
