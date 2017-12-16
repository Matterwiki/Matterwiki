import React from "react";
import { HelpBlock, Button, ListGroup, ListGroupItem } from "react-bootstrap";

import { List, ListItem, ListItemHeader, ListItemBody } from "ui";

// TODO Componentize further?
const BrowseArchives = ({ onArchiveChosen, archives, currentArchive }) => {
  const archiveClick = (id, e) => {
    e.preventDefault();
    onArchiveChosen(id);
  };

  if (!archives.length) {
    return <HelpBlock>There are no archives for this article</HelpBlock>;
  }
  return (
    <List>
      {archives.map(archive => {
        const lastUpdated = new Date(
          archive.updated_at.replace(" ", "T")
        ).toDateString();

        return (
          <ListItem
            key={archive.id}
            onClick={e => archiveClick(archive.id, e)}
            cursorPointer
            active={currentArchive && currentArchive.id === archive.id}>
            <ListItemHeader>
              {lastUpdated}
            </ListItemHeader>
            <ListItemBody>
              {archive.change_log}
            </ListItemBody>
          </ListItem>
        );
      })}
    </List>
  );
};

export default BrowseArchives;
