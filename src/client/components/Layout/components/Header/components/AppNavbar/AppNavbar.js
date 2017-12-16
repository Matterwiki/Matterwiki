import React from "react";

import { Link } from "react-router-dom";

import { Navbar, ImageWrapper, NavItem, Button, Nav } from "ui";

import Logo from "assets/logo.png";
import SearchForm from "./components/SearchForm";

const AppNavbar = ({ isAdmin, handleLogoutClick }) =>
  <Navbar>
    <ImageWrapper height="5">
      <Link replace to="/home" className="navbar-brand">
        <img alt="Matterwiki" src={Logo} />
      </Link>
    </ImageWrapper>
    <Nav pull="right">
      {isAdmin &&
        <NavItem>
          <Link to="/admin">Admin</Link>
        </NavItem>}
      <NavItem>
        <Link to="/article/new">New Article</Link>
      </NavItem>
      <NavItem>
        <SearchForm />
      </NavItem>
      <NavItem>
        <Button onClick={handleLogoutClick} outline>
          {" "}Logout{" "}
        </Button>
      </NavItem>
    </Nav>
  </Navbar>;

export default AppNavbar;
