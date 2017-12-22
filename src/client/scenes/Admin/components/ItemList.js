import React from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

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
      <ListGroupItem header={item.name}>
        {/* Only used in the Admin section at this point. If this were to be used elswehere, 
          a schema level change is inevitable */}
        {item.description || item.about || "-"}
        <span className="pull-right">
          <Button
            onClick={e => {
              this.handleEditClick(item, e);
            }}>
            Edit
          </Button>
          {item.id !== 1 && (
            <Button
              onClick={e => {
                this.handleDeleteClick(item, e);
              }}>
              Delete
            </Button>
          )}
        </span>
      </ListGroupItem>
    );
  }
}

const ResourceList = ({ items, itemName, onEditClick, onDeleteClick }) => (
  <ListGroup>
    {items.map(item => (
      <ResourceListItem
        key={item.id}
        item={item}
        itemName={itemName}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    ))}
  </ListGroup>
);

export default ResourceList;
