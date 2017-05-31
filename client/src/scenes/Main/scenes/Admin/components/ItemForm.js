import React from "react";
import { hashHistory } from "react-router";

import { Form, FormGroup, FormControl, Col, Button } from "react-bootstrap";

class ItemForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.initState = this._initState.bind(this);
    this.onChange = this._onChange.bind(this);
    this.onSubmit = this._onSubmit.bind(this);

    this.initState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initState(nextProps);
  }

  _initState({ itemFormFields, item }) {
    this.state = itemFormFields.reduce((state, formField) => {
      state[formField.name] = item ? item[formField.name] : "";
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
    const { item, itemName, itemFormFields } = this.props;
    return (
      <Form className="tabform" onSubmit={this.onSubmit}>
        {itemFormFields.map(formField => (
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
            {item ? `Update ${itemName}` : `Add ${itemName}`}
          </Button>
        </Col>
      </Form>
    );
  }
}

export default ItemForm;
