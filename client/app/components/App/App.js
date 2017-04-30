import React from "react";
import Alert from "react-s-alert";
import { hashHistory } from "react-router";
import { Header, Footer, Container } from "./Layout/index";

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

// TODO refactor the Auth logic into a HOC
class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    // TODO Make this check stronger
    if (window.localStorage.getItem("userToken") == "") {
      hashHistory.push("login");
    }
  }

  handleLogout() {
    window.localStorage.setItem("userToken", "");
    Alert.success("You've been successfully logged out");
    hashHistory.push("login");
  }

  render() {
    const headerProps = {
      isAdmin: parseInt(window.localStorage.getItem("userId")) === 1,
      isLoggedIn: window.localStorage.getItem("userToken") ? true : false,
      handleLogoutClick: this.handleLogout
    };

    return (
      <div>
        <Header {...headerProps} />
        <Container>
          {this.props.children}
        </Container>
        <Footer />
        <Alert stack={{ limit: 1 }} position="bottom" />
      </div>
    );
  }
}

export default App;
