import React from "react";
import { Navbar } from "react-bootstrap";
import Logo from "assets/logo.png";

const LoginNavbar = () => (
  <Navbar>
    <center>
      <a className="navbar-login-logo" href="#">
        <img src={Logo} />
      </a>
    </center>
  </Navbar>
);

export default LoginNavbar;
