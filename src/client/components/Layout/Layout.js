import React from "react";
import { Container } from "ui";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

import "./Layout.css";

const Layout = ({ children, ...props }) =>
  <div>
    <Header {...props} />
    <Container>
      {children}
    </Container>
    <Footer />
  </div>;

export default Layout;
