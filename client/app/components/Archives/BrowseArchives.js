import React from "react";
import { HelpBlock, Button, ListGroup, ListGroupItem } from "react-bootstrap";

const BrowseArchives = props => {
  const archiveClick = (id, e) => {
    e.preventDefault();
    props.onArchiveChosen(id);
  };
  if (!props.archives.length) {
    return (
      <HelpBlock className="center-align">
        There are no archives for this article
      </HelpBlock>
    );
  } else {
    return (
      <div className="custom-collapse">
        <div className="visible-xs">
          <Button
            className="collapse-toggle"
            data-toggle="collapse"
            data-parent="custom-collapse"
            data-target="#side-menu-collapse">
            View Archives
          </Button>
          <br />
          <br />
        </div>
        <ListGroup id="side-menu-collapse" className="collapse archive-list">
          {props.archives.map(archive => {
            const lastUpdated = new Date(
              archive.updated_at.replace(" ", "T")
            ).toDateString();

            return (
              <ListGroupItem
                key={archive.id}
                header={lastUpdated}
                onClick={e => archiveClick(archive.id, e)}>
                {archive.what_changed}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
};

export default BrowseArchives;
