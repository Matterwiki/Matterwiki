import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Row, Col } from "ui";

import AdminNavBar from "./components/AdminNavBar";

import { ManageTopics, ManageUsers } from "./scenes/AdminScenes";

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
    const currentTab =
      pathArray.length === 3 && !!pathArray[2] ? pathArray[pathArray.length - 1] : "users";

    return currentTab;
  };

  updateTab = (name, e) => {
    e.preventDefault();
    this.setState({
      tab: name
    });
    if (name !== this.getCurrentTab()) {
      this.props.history.push(`/admin/${name}`);
    }
  };

  render() {
    const { location, match } = this.props;

    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <AdminNavBar handleSelect={this.updateTab} activeTab={this.state.tab} />
              {location.pathname === "/admin" ? <Redirect to={`${match.url}/users`} /> : ""}
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch>
                <Route path={`${match.url}/topics`} component={ManageTopics} />
                <Route path={`${match.url}/users`} component={ManageUsers} />
              </Switch>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Admin;
