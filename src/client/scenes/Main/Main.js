import React from "react";
import Alert from "react-s-alert";
// import { hashHistory } from "react-router";
import { Switch, Route } from "react-router-dom";
import NotificationsWrapper from 'components/Notifications/NotificationsWrapper.js';

import Layout from "components/Layout/Layout";
import APIProvider from "utils/APIProvider";


import {
  Login,
  Setup,
  Search,
  Home,
  Article,
  Admin
} from "./AllScenesMain";


// bunch of custom styles that are needed globally
import "./bootstrap.css";
import "./style.css";

// TODO refactor the Auth logic into a HOC
class Main extends React.Component {
  componentWillMount() {
    // Hack to move away from here if going to setup
    console.log('component will mount');
    if (!this.props.location.pathname.includes("setup")) {
      // TODO Make this check stronger

      const token = window.localStorage.getItem("userToken");

      if (!token) return this.props.history.push("login");

      // TODO Setup a separate "verifyJWT" route to kick the user out to the login page
      APIProvider.get("articles").catch(err => {
        if (err.code === "B101") {
          window.localStorage.setItem("userToken", "");
          return this.props.history.push("login");
        }
      });
    }
  }

  handleLogout = () => {
    window.localStorage.setItem("userToken", "");
    Alert.success("You've been successfully logged out");
    // hashHistory.push("login");
  };

  render() {
    console.log('rendering now');
    const headerProps = {
      isAdmin: parseInt(window.localStorage.getItem("userId")) === 1,
      isLoggedIn: window.localStorage.getItem("userToken") ? true : false,
      handleLogoutClick: this.handleLogout
    };

    return (
      <div>
        <Layout {...headerProps}>
          {/*{this.props.children}*/}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/article" component={Article} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/setup" component={Setup} />
          </Switch>
        </Layout>
        <NotificationsWrapper />
      </div>
    );
  }
}

export default Main;
