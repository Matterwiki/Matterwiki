import React from "react";

import LoginNavbar from "./LoginNavbar";
import AppNavbar from "./AppNavbar";

const Header = props => {
  return (props.isLoggedIn && <AppNavbar {...props} />) || <LoginNavbar />;
};

export default Header;
