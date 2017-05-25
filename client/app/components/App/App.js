import React from "react";
import Alert from "react-s-alert";
import { hashHistory } from "react-router";
import Layout from "./Layout/index";

import "react-s-alert/dist/s-alert-default.css";

// bunch of custom styles that are needed globally
import "./bootstrap.css";
import "./style.css";

import APIProvider from "utils/APIProvider";

// TODO refactor the Auth logic into a HOC
class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    // Hack to move away from here if going to setup
    if (!this.props.location.pathname.includes("setup")) {
      // TODO Make this check stronger
      const token = window.localStorage.getItem("userToken");

      if (!token) return hashHistory.push("login");

      // TODO Setup a separate "verifyJWT" route to kick the user out to the login page
      APIProvider.get("articles").catch(err => {
        if (err.code === "B101") {
          window.localStorage.setItem("userToken", "");
          return hashHistory.push("login");
        }
      });
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
        <Layout {...headerProps}>
          {this.props.children}
        </Layout>
        <Alert stack={{ limit: 1 }} position="bottom" />
      </div>
    );
  }
}

export default App;
