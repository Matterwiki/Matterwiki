import React from "react";

import { Form, Input, Button, Icon } from "ui";
import { BorderedBox } from "ui/utils";

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
    const newState = itemFormFields.reduce((acc, formField) => {
      acc[formField.name] = item ? item[formField.name] : "";
      return acc;
    }, {});
    this.setState(newState);
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
      <BorderedBox shadow={item !== null}>
        {currentlyEditing}
        <Form onSubmit={this.onSubmit} marginBottom="0">
          {itemFormFields.map(formField => (
            <Input
              type={formField.type}
              placeholder={formField.name}
              name={formField.name}
              value={this.state[formField.name]}
              onChange={this.onChange}
              key={formField.name}
            />
          ))}
          <Button type="submit" block>
            <Icon type={item ? "send" : "plus-square"} size="12" />{" "}
            {item ? `Update ${itemName}` : `Add ${itemName}`}
          </Button>
          {item ? (
            <Button block onClick={this.cancelUpdate} outline>
              <Icon type="x-square" size="12" /> Cancel
            </Button>
          ) : (
            ""
          )}
        </Form>
      </BorderedBox>
    );
  }
}

export default ItemForm;
