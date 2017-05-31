// TODO there are two components that use forms as of now. Make them generic if there is more!

import React from "react";
import { Form, FormGroup, FormControl, Col, Button } from "react-bootstrap";

// TODO move these fellas to a nice consts file
const SETUP_FORM_FIELDS = [
  { name: "name", type: "text" },
  { name: "about", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" }
];

// TODO add validation to this form
// TODO maybe use this approach for further improving forms in general:
// https://bartj.com/posts/2016-11-07-managing-form-validation-in-react.html
class SetupForm extends React.Component {
  constructor(...args) {
    super(...args);

    // Setup state
    this.state = SETUP_FORM_FIELDS.reduce((state, formField) => {
      state[formField.name] = "";
      return state;
    }, {});

    this.onChange = this._onChange.bind(this);
    this.onSubmit = this._onSubmit.bind(this);
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
  }

  render() {

    return (
      <Form onSubmit={this.onSubmit}>
        {SETUP_FORM_FIELDS.map(formField => (
          <Col sm={12} key={formField.name}>
            <FormGroup>
              <FormControl
                type={formField.type}
                name={formField.name}
                placeholder={formField.name}
                value={this.state[formField.name]}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
        ))}
        <Col sm={12}>
          <Button
            type="submit" 
            block={true}>
            Setup My Account
          </Button>
        </Col>
      </Form>
    );
  }
}

export default SetupForm;
