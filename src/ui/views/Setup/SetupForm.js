import React from "react";
import PropTypes from "prop-types";

import { Form, FormGroup, Input, Button } from "reactstrap";

class SetupForm extends React.Component {
  state = {
    name: "",
    about: "",
    email: "",
    password: ""
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <Form className="mt-3" onSubmit={this.onSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="about"
            id="about"
            placeholder="About"
            value={this.state.about}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </FormGroup>
        <Button size="lg" block>
          Set up my account
        </Button>
      </Form>
    );
  }
}

SetupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SetupForm;
