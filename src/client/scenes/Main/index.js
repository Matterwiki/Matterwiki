import React from "react";
import Alert from "react-s-alert";
import { hashHistory } from "react-router";
import NotificationsWrapper from 'components/Notifications/NotificationsWrapper.js';

import Layout from "./components/Layout/index";
import APIProvider from "utils/APIProvider";

// bunch of custom styles that are needed globally
import "./bootstrap.css";
import "./style.css";

// TODO refactor the Auth logic into a HOC
class Main extends React.Component {
  componentWillMount() {
    // Hack to move away from here if going to setup
    if (!this.props.location.pathname.includes("setup")) {
      const token = window.localStorage.getItem("userToken");

      if (!token) return hashHistory.push("login");

      APIProvider.get("auth/check").catch(err => {
        if (err.status === 401) {
          window.localStorage.setItem("userToken", "");
          return hashHistory.push("login");
        }
      });
    }
  }

  handleLogout = () => {
    window.localStorage.setItem("userToken", "");
    Alert.success("You've been successfully logged out");
    hashHistory.push("login");
  };

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
        <NotificationsWrapper />
      </div>
    );
  }
}

export default Main;
