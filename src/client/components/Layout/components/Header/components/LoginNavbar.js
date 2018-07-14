import React from "react";
import Logo from "assets/logo.svg";
import { Container, ImageWrapper } from "ui";

const LoginNavbar = () => (
  <Container center marginBottom="3">
    <ImageWrapper height="7">
      <img alt="Matterwiki" src={Logo} />
    </ImageWrapper>
  </Container>
);

export default LoginNavbar;
