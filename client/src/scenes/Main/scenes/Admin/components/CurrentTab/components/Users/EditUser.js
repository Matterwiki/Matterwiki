import React from "react";
import { hashHistory } from "react-router";
import Alert from "react-s-alert";
import { Grid, Row, Col } from "react-bootstrap";
import UserForm from "./UserForm";
import Loader from "Loader/index";

import APIProvider from "utils/APIProvider";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.editUser = this.editUser.bind(this);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    APIProvider.get(`users/${this.props.params.userId}`).then(user => {
      this.setState({
        user,
        loading: false
      });
    });
  }

  editUser(user) {
    user.id = this.props.params.userId;

    APIProvider.put("users", user).then(user => {
      Alert.success("User has been edited");
      hashHistory.push("admin");
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    else
      return (
        <Grid>
          <Row>
            <Col md={12} sm={12}>
              <h1><b>Update User</b></h1>
              <br />
              <UserForm user={this.state.user} onSubmit={this.editUser} />
            </Col>
          </Row>
        </Grid>
      );
  }
}

export default EditUser;
