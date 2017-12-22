import React from "react";

const ArticleSidebarItem = ({ title, children }) => (
  <div className="sidebar-block">
    <div className="sidebar-title">{title}</div>
    {children}
  </div>
);

export default ArticleSidebarItem;
