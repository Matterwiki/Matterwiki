import React from "react";
import { Link } from "react-router-dom";
import { NavItem, Icon } from "ui";
import SearchForm from "./SearchForm";

const AllNavItems = ({ isAdmin, onLogout }) => (
  <React.Fragment>
    <NavItem>
      <SearchForm />
    </NavItem>
    {isAdmin && (
      <NavItem>
        <Link to="/admin">
          <Icon type="terminal" />Admin
        </Link>
      </NavItem>
    )}
    <NavItem>
      <Link to="/article/new">
        <Icon type="plus-square" />New Article
      </Link>
    </NavItem>
    <NavItem>
      <a href="#" onClick={onLogout}>
        <Icon type="log-out" />Logout
      </a>
    </NavItem>
  </React.Fragment>
);

export default AllNavItems;
