import React from "react";
import "./Admin.css";
import { hashHistory } from "react-router";

import AdminNavBar from "./components/AdminNavBar";

class Admin extends React.Component {
  constructor(...args) {
    super(...args);
    // Hack to decide the chosen tab based on the URL.
    // TODO There must be a better way to do this. Fix when moving to RR v4
    const pathArray = this.props.location.pathname.split("/");
    const currentTab = pathArray.length === 3 && !!pathArray[2]
      ? pathArray[pathArray.length - 1]
      : "users";

    this.state = {
      tab: currentTab
    };
  }

  updateTab = name => {
    hashHistory.push(`admin/${name}`);
    this.setState({
      tab: name
    });
  };

  render() {
    return (
      (this.state.loading && <Loader />) ||
      <div>
        <AdminNavBar handleSelect={this.updateTab} activeTab={this.state.tab} />
        {this.props.children}
      </div>
    );
  }
}

export default Admin;
