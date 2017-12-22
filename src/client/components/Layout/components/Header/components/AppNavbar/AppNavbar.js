import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "assets/logo.png";
import SearchForm from "./components/SearchForm";

const LinkNavItem = ({ to, children }) => (
  <LinkContainer to={to}>
    <NavItem> {children} </NavItem>
  </LinkContainer>
);

const AppNavbar = ({ isAdmin, handleLogoutClick }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link replace to="/home" className="navbar-brand">
          <img alt="Matterwiki" src={Logo} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <SearchForm />
      <Nav pullRight>
        {isAdmin && <LinkNavItem to="/admin">Admin</LinkNavItem>}
        <LinkNavItem to="/article/new">New Article</LinkNavItem>
        <NavItem onClick={handleLogoutClick}> Logout </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppNavbar;
