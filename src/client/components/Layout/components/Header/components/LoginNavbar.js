import React from "react";
import { Navbar } from "react-bootstrap";
import Logo from "assets/logo.png";

const LoginNavbar = () => (
  <Navbar>
    <center>
      <a className="navbar-login-logo">
        <img alt="Matterwiki" src={Logo} />
      </a>
    </center>
  </Navbar>
);

export default LoginNavbar;
