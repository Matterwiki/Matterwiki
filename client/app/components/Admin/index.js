import React from "react";
import "./Admin.css";

import AdminNavBar from './AdminNavBar';
import CurrentTab from "./CurrentTab";

import API from "api/wrapper.js";

class Admin extends React.Component {
  constructor(...args) {
    super(...args);

    this.updateTab = this.updateTab.bind(this);

    this.state = {
      tab: "users"
    };
  }

  updateTab(name) {
    this.setState({
      tab: name
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <div>
          <AdminNavBar
            handleSelect={this.updateTab}
            activeTab={this.state.tab}
          />
          <CurrentTab tab={this.state.tab} />
        </div>
      );
  }
}

export default Admin;
