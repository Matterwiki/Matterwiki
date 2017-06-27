import React from "react";
import "./Admin.css";
// import { hashHistory } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavBar from "./components/AdminNavBar";

import {
  ManageTopics,
  ManageUsers,
  LogoUpload
} from "./scenes/AllScenesAdmin";

class Admin extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      tab: this.getCurrentTab()
    };
  }

  getCurrentTab = () => {
    // Hack to decide the chosen tab based on the URL.
    // TODO There must be a better way to do this. Fix when moving to RR v4
    const pathArray = this.props.location.pathname.split("/");
    const currentTab = pathArray.length === 3 && !!pathArray[2]
      ? pathArray[pathArray.length - 1]
      : "users";

    return currentTab;
  };

  updateTab = name => {
    this.setState({
      tab: name
    });
    if (name != this.getCurrentTab()) {
      this.props.history.push(`/admin/${name}`);
    }
  };

  render() {
    return (
      (this.state.loading && <Loader />) ||
      <div>
        <AdminNavBar handleSelect={this.updateTab} activeTab={this.state.tab} />
        {/*{this.props.children}*/}
        { (this.props.location.pathname === '/admin') ? <Redirect to={`${this.props.match.url}/users`} /> : ""}
        <Switch>
          <Route path={`${this.props.match.url}/topics`} component={ManageTopics} />
          <Route path={`${this.props.match.url}/users`} component={ManageUsers} />
          <Route path={`${this.props.match.url}/design`} component={LogoUpload} />
        </Switch>
      </div>
    );
  }
}

export default Admin;
