import React from "react";
import { hashHistory } from "react-router";

import { Form, FormGroup, FormControl, Col, Button } from "react-bootstrap";

// TODO move these fellas to a nice consts file
const USER_FORM_FIELDS = [
  { name: "name", type: "text" },
  { name: "about", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" }
];

class UserForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.initState = this._initState.bind(this);
    this.onChange = this._onChange.bind(this);
    this.onSubmit = this._onSubmit.bind(this);

    this.initState();
  }

  _initState() {
    this.state = USER_FORM_FIELDS.reduce((state, formField) => {
      state[formField.name] = this.props.user
        ? decodeURIComponent(this.props.user[formField.name])
        : "";
      return state;
    }, {});
  }

  _onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  _onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.initState();
  }

  render() {
    return (
      <Form className="tabform" onSubmit={this.onSubmit}>
        {USER_FORM_FIELDS.map(formField => (
          <Col sm={12} key={formField.name}>
            <FormGroup>
              <FormControl
                type={formField.type}
                placeholder={formField.name}
                name={formField.name}
                value={this.state[formField.name]}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
        ))}
        <Col sm={12}>
          <Button type="submit" block={true}>
            {this.props.user ? "Update User" : "Add User"}
          </Button>
        </Col>
      </Form>
    );
  }
}

export default UserForm;
