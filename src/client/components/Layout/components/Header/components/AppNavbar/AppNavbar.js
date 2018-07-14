import React from "react";

import { Link } from "react-router-dom";

import { Navbar, NavLogo, NavItem, Button, Nav, Icon, NavCollapse, Container } from "ui";
import { Hide } from "ui/utils";

import Logo from "assets/logo.svg";
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
        <Container>
          <NavLogo>
            <Link replace to="/home">
              <img alt="Matterwiki" src={Logo} /> {isOpen}
            </Link>
          </NavLogo>
          <Nav pull="right">
            <Hide small>
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
        </Container>
      </Navbar>
    );
  }
}

export default AppNavbar;
