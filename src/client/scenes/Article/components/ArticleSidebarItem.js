import React from "react";

import { Heading, SidebarBlock } from "ui";

const ArticleSidebarItem = ({ title, children }) =>
  <SidebarBlock>
    <Heading size="1" transform="uppercase">
      {title}
    </Heading>
    {children}
  </SidebarBlock>;

export default ArticleSidebarItem;
