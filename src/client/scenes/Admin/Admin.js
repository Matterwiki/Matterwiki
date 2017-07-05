import React from "react";
import "./Admin.css";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavBar from "./components/AdminNavBar";

import {
  ManageTopics,
  ManageUsers,
  LogoUpload
} from "./scenes/AdminScenes";

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
    const {location, match} = this.props;

    return (
      (this.state.loading && <Loader />) ||
      <div>
        <AdminNavBar handleSelect={this.updateTab} activeTab={this.state.tab} />
        { (location.pathname === '/admin') ? <Redirect to={`${match.url}/users`} /> : ""}
        <Switch>
          <Route path={`${match.url}/topics`} component={ManageTopics} />
          <Route path={`${match.url}/users`} component={ManageUsers} />
          <Route path={`${match.url}/design`} component={LogoUpload} />
        </Switch>
      </div>
    );
  }
}

export default Admin;
