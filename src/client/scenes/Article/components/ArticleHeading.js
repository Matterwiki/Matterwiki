import React, { Children } from "react";

import { Heading, Icon } from "ui";
import { Hide, DisplayFlexRow } from "ui/utils";

const ArticleHeading = ({ article, children }) => (
  <div>
    <Heading size="6">{children}</Heading>
    <DisplayFlexRow>
      <Icon type="clock" size="12" />&nbsp; <Hide small>Last updated on&nbsp;</Hide>
      {new Date(article.updated_at.replace(" ", "T")).toDateString()} <Hide small>by &nbsp;</Hide>
      <Icon type="user" size="12" />&nbsp;
      {article.modifiedByUser.name}
    </DisplayFlexRow>
  </div>
);

export default ArticleHeading;
