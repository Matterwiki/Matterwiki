import React from "react";
import { Form, FormGroup, FormControl, Col, Button } from "react-bootstrap";

// TODO move these fellas to a nice consts file
const LOGIN_FORM_FIELDS = [
  { name: "email", type: "email" },
  { name: "password", type: "password" }
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

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        {LOGIN_FORM_FIELDS.map(formField => (
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
          <Button type="submit" block>
            Sign in
          </Button>
        </Col>
      </Form>
    );
  }
}

export default LoginForm;
