import React from "react";
import "./Admin.css";
// import { hashHistory } from "react-router";
import { Switch, Route } from "react-router-dom";

import AdminNavBar from "./components/AdminNavBar";

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
    // hashHistory.push(`admin/${name}`);
    this.setState({
      tab: name
    });
  };

  render({ match }) {
    return (
      (this.state.loading && <Loader />) ||
      <div>
        <AdminNavBar handleSelect={this.updateTab} activeTab={this.state.tab} />
        {/*{this.props.children}*/}
        <Switch>
          <Route exact path={`${match.url}/topics`} component={ManageTopics} />
          <Route exact path={`${match.url}/users`} component={ManageUsers} />
          <Route exact path={`${match.url}/design`} component={LogoUpload} />
        </Switch>
      </div>
    );
  }
}

export default Admin;
