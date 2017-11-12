import React from "react";

import MatterwikiLogo from "../../../../../public/assets/logo.png";

import "./Logo.css";

const Logo = () => (
  <div className="text-center login-logo">
    <img alt="Matterwiki" src={MatterwikiLogo} />
  </div>
);

export default Logo;
