import React from "react";
import { Row, Col, List, ListItem, ListItemHeader, Button, Icon, Loader } from "ui";
import { DisplayFlexRow, Hide } from "ui/utils";

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
            <DisplayFlexRow>
              <Col>
                <ListItemHeader>{item.name}</ListItemHeader>
                {/* Only used in the Admin section at this point. If this were to be used elswehere, 
          a schema level change is inevitable */}
                {item.description || item.about || "-"}
              </Col>
              <Col textAlign="right">
                <Button
                  onClick={e => {
                    this.handleEditClick(item, e);
                  }}
                  clear
                  small>
                  <Icon type="edit" size="12" />
                  <Hide small> Edit</Hide>
                </Button>&nbsp;
                {item.id !== 1 && (
                  <Button
                    clear
                    onClick={e => {
                      this.handleDeleteClick(item, e);
                    }}
                    small>
                    <Icon type="trash-2" size="12" />
                    <Hide small> Delete</Hide>
                  </Button>
                )}
              </Col>
            </DisplayFlexRow>
          </Col>
        </Row>
      </ListItem>
    );
  }
}

const ResourceList = ({
  items,
  itemName,
  onEditClick,
  onDeleteClick,
  handleLoadMore,
  itemsMeta,
  appendingItems
}) => (
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
    {itemsMeta && itemsMeta.remainingPages === 0 ? null : (
      <span>
        {appendingItems ? (
          <Loader />
        ) : (
          <DisplayFlexRow justifyContent="center" marginTop="2">
            <Button outline onClick={handleLoadMore}>
              Load More
            </Button>
          </DisplayFlexRow>
        )}
      </span>
    )}
  </List>
);

export default ResourceList;
