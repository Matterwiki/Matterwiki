import React from "react";

import { Link } from "react-router-dom";

import { Navbar, ImageWrapper, NavItem, Button, Nav, Icon, NavCollapse } from "ui";
import { Hide } from "ui/utils";

import Logo from "assets/logo.png";
import AllNavItems from "./components/AllNavItems";

class AppNavbar extends React.Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    // Listen to route change. If the route changes and the navbar is open then collapse it
    this.props.history.listen(() => {
      const isOpen = this.state.isOpen;
      if (isOpen) {
        this.toggleNav();
      }
    });
  }

  toggleNav = () => {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const { isAdmin, handleLogoutClick } = this.props;
    return (
      <Navbar>
        <ImageWrapper height="4">
          <Link replace to="/home" className="navbar-brand">
            <img alt="Matterwiki" src={Logo} /> {isOpen}
          </Link>
        </ImageWrapper>
        <Nav pull="right">
          <Hide small extraSmall>
            <AllNavItems isAdmin={isAdmin} onLogout={handleLogoutClick} />
          </Hide>
          <Hide medium large>
            <NavItem>
              <Button onClick={this.toggleNav} clear>
                <Icon type="menu" />
              </Button>
            </NavItem>
            <NavCollapse isOpen={isOpen}>
              <AllNavItems isAdmin={isAdmin} onLogout={handleLogoutClick} />
            </NavCollapse>
          </Hide>
        </Nav>
      </Navbar>
    );
  }
}

export default AppNavbar;
