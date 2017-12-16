import React from "react";
import Logo from "assets/logo.png";
import { Container, ImageWrapper } from "ui";

const LoginNavbar = () =>
  <Container textAlign="center">
    <ImageWrapper height="5">
      <img alt="Matterwiki" src={Logo} />
    </ImageWrapper>
  </Container>;

export default LoginNavbar;
