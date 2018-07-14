import React from "react";
import { Button, Container, Form, Input, Icon } from "ui";
// TODO move these fellas to a nice consts file
const LOGIN_FORM_FIELDS = [
  { name: "Email", type: "email" },
  { name: "Password", type: "password" }
];

// TODO add validation to this form
// TODO maybe use this approach for further improving forms in general:
// https://bartj.com/posts/2016-11-07-managing-form-validation-in-react.html
class LoginForm extends React.Component {
  // Setup state
  state = LOGIN_FORM_FIELDS.reduce((acc, formField) => ({ [formField.name]: "", ...acc }), {});

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSlackLogin = () => {
    window.location = "/api/auth/slack";
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <Container center maxWidth="500" column>
        <Form onSubmit={this.onSubmit}>
          {LOGIN_FORM_FIELDS.map(formField => (
            <Input
              key={formField.name}
              type={formField.type}
              placeholder={formField.name}
              name={formField.name}
              value={this.state[formField.name]}
              onChange={this.onChange}
            />
          ))}
          <Button type="submit" block>
            <Icon type="log-in" size="12" />Sign in
          </Button>
        </Form>
        <Button onClick={this.handleSlackLogin} block outline large>
          <Icon type="slack" size="12" /> Login via Slack
        </Button>
      </Container>
    );
  }
}

export default LoginForm;
