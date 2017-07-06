import React from "react";

import LoginNavbar from "./components/LoginNavbar";
import AppNavbar from "./components/AppNavbar/AppNavbar";

const Header = ({ isLoggedIn, ...props }) =>
  isLoggedIn ? <AppNavbar {...props} /> : <LoginNavbar />;

export default Header;
