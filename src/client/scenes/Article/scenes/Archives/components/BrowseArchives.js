import React from "react";

import { List, ListItem, ListItemHeader, ListItemBody, Loader, Button, HelpBlock } from "ui";
import { Flex } from "ui/utils";

// TODO Componentize further?
const BrowseArchives = ({
  onArchiveChosen,
  archives,
  currentArchive,
  archivesMeta,
  appendingArchives,
  handleLoadMore
}) => {
  const archiveClick = (id, e) => {
    e.preventDefault();
    onArchiveChosen(id);
  };

  if (!archives.length) {
    return <HelpBlock>There are no archives for this article</HelpBlock>;
  }
  return (
    <React.Fragment>
      <List>
        {archives.map(archive => {
          const lastUpdated = new Date(archive.updated_at.replace(" ", "T")).toDateString();

          return (
            <ListItem
              key={archive.id}
              onClick={e => archiveClick(archive.id, e)}
              cursorPointer
              active={currentArchive && currentArchive.id === archive.id}>
              <ListItemHeader>{lastUpdated}</ListItemHeader>
              <ListItemBody>{archive.change_log}</ListItemBody>
            </ListItem>
          );
        })}
      </List>
      {archivesMeta && archivesMeta.remainingPages === 0 ? null : (
        <span>
          {appendingArchives ? (
            <Loader />
          ) : (
            <Flex justifyContent="center" marginTop="2">
              <Button outline onClick={handleLoadMore}>
                Load More
              </Button>
            </Flex>
          )}
        </span>
      )}
    </React.Fragment>
  );
};

export default BrowseArchives;
