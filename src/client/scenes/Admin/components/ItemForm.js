import React from "react";

import { Form, FormGroup, FormControl, Col, Button } from "react-bootstrap";

class ItemForm extends React.Component {
  componentWillMount() {
    this.initState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.initState(nextProps);
  }

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit, itemFormFields } = this.props;

    onSubmit(this.state);
    this.initState({
      itemFormFields
    });
  };

  initState = ({ itemFormFields, item }) => {
    this.state = itemFormFields.reduce((acc, formField) => {
      acc[formField.name] = item ? item[formField.name] : "";
      return acc;
    }, {});
  };

  cancelUpdate = e => {
    e.preventDefault();
    this.props.onCancelUpdate();
  };

  render() {
    const { item, itemName, itemFormFields } = this.props;
    const currentlyEditing = item && (
      <p className="editing-heading">You are currently editing a {itemName}</p>
    );

    return (
      <div>
        {currentlyEditing}
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
            <Button type="submit" block>
              {item ? `Update ${itemName}` : `Add ${itemName}`}
            </Button>
            {item ? (
              <Button block onClick={this.cancelUpdate}>
                Cancel
              </Button>
            ) : (
              ""
            )}
          </Col>
        </Form>
      </div>
    );
  }
}

export default ItemForm;
