import React from "react";
import { HelpBlock, Button, ListGroup, ListGroupItem } from "react-bootstrap";

// TODO Componentize further?
const BrowseArchives = ({ onArchiveChosen, archives }) => {
  const archiveClick = (id, e) => {
    e.preventDefault();
    onArchiveChosen(id);
  };

  if (!archives.length) {
    return <HelpBlock className="center-align">There are no archives for this article</HelpBlock>;
  }
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
        {archives.map(archive => {
          const lastUpdated = new Date(archive.updated_at.replace(" ", "T")).toDateString();

          return (
            <ListGroupItem
              key={archive.id}
              header={lastUpdated}
              onClick={e => archiveClick(archive.id, e)}>
              {archive.change_log}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default BrowseArchives;
