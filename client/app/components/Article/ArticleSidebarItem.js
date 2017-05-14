import React from "react";

const ArticleSidebarItem = props => (
  <div className="sidebar-block">
    <div className="sidebar-title">{props.title}</div>
    {props.children}
  </div>
);

export default ArticleSidebarItem;
