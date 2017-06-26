import React from "react";
import { hashHistory } from "react-router";

import { Form, FormGroup, FormControl, Col, Button } from "react-bootstrap";

class ItemForm extends React.Component {
  initState = ({ itemFormFields, item }) => {
    this.state = itemFormFields.reduce((state, formField) => {
      state[formField.name] = item ? item[formField.name] : "";
      return state;
    }, {});
  };

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.initState();
  };

  cancelUpdate = e => {
    e.preventDefault();
    this.props.onCancelUpdate();
  };

  componentWillMount() {
    this.initState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.initState(nextProps);
  }

  render() {
    const { item, itemName, itemFormFields } = this.props;
    const currentlyEditing = () => {
      if (item) {
        return (
          <p className="editing-heading">You're currently editing a {itemName}</p>
        );
      }
    }
    return (
      <div>
        { currentlyEditing() }
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
            { (item) ? 
              <Button block={true} onClick={this.cancelUpdate}>
                Cancel
              </Button> : ''
            }
          </Col>
        </Form>
      </div>
    );
  }
}

export default ItemForm;
