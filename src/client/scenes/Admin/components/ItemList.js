import React from "react";
import { Row, Col, List, ListItem, ListItemHeader, Button, Icon } from "ui";

class ResourceListItem extends React.Component {
  handleDeleteClick = (item, e) => {
    e.preventDefault();
    this.props.onDeleteClick(this.props.item.id);
  };
  handleEditClick = (item, e) => {
    e.preventDefault();
    this.props.onEditClick(this.props.item.id);
  };

  render() {
    const { item } = this.props;
    return (
      <ListItem>
        <Row>
          <Col>
            <ListItemHeader>{item.name}</ListItemHeader>
            {/* Only used in the Admin section at this point. If this were to be used elswehere, 
          a schema level change is inevitable */}
            {item.description || item.about || "-"}
          </Col>
          <Col width="50" textAlign="right">
            <Button
              onClick={e => {
                this.handleEditClick(item, e);
              }}
              clear
              small>
              <Icon type="edit" size="12" /> Edit
            </Button>&nbsp;
            {item.id !== 1 && (
              <Button
                clear
                onClick={e => {
                  this.handleDeleteClick(item, e);
                }}
                small>
                <Icon type="trash-2" size="12" /> Delete
              </Button>
            )}
          </Col>
        </Row>
      </ListItem>
    );
  }
}

const ResourceList = ({ items, itemName, onEditClick, onDeleteClick }) => (
  <List>
    {items.map(item => (
      <ResourceListItem
        key={item.id}
        item={item}
        itemName={itemName}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    ))}
  </List>
);

export default ResourceList;
