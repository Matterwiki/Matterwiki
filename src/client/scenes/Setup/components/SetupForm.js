import React from "react";
import { Form, Input, Button } from "ui";

// TODO move these fellas to a nice consts file
const SETUP_FORM_FIELDS = [
  { name: "Name", type: "text" },
  { name: "About", type: "text" },
  { name: "Email", type: "email" },
  { name: "Password", type: "password" }
];

// TODO add validation to this form
// TODO maybe use this approach for further improving forms in general:
// https://bartj.com/posts/2016-11-07-managing-form-validation-in-react.html
class SetupForm extends React.Component {
  state = SETUP_FORM_FIELDS.reduce((acc, formField) => {
    acc[formField.name] = "";
    return acc;
  }, {});

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
        {SETUP_FORM_FIELDS.map(formField => (
          <Input
            type={formField.type}
            name={formField.name}
            placeholder={formField.name}
            value={this.state[formField.name]}
            onChange={this.onChange}
            key={formField.name}
          />
        ))}
        <Button type="submit" block>
          Setup My Account
        </Button>
      </Form>
    );
  }
}

export default SetupForm;
