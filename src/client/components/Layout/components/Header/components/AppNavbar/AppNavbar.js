import React from "react";

import { Link } from "react-router-dom";

import { Navbar, ImageWrapper, NavItem, Button, Nav, Icon } from "ui";

import Logo from "assets/logo.png";
import SearchForm from "./components/SearchForm";

const AppNavbar = ({ isAdmin, handleLogoutClick }) =>
  <Navbar>
    <ImageWrapper height="4">
      <Link replace to="/home" className="navbar-brand">
        <img alt="Matterwiki" src={Logo} />
      </Link>
    </ImageWrapper>
    <Nav pull="right">
      <NavItem>
        <SearchForm />
      </NavItem>
      {isAdmin &&
        <NavItem>
          <Link to="/admin">
            <Icon type="terminal" />Admin
          </Link>
        </NavItem>}
      <NavItem>
        <Link to="/article/new">
          <Icon type="plus-square" />New Article
        </Link>
      </NavItem>
      <NavItem>
        <Button onClick={handleLogoutClick} outline>
          <Icon type="log-out" />Logout
        </Button>
      </NavItem>
    </Nav>
  </Navbar>;

export default AppNavbar;
