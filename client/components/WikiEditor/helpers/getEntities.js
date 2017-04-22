const getEntities = (entityType) => (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === entityType
      );
    },
    callback
  );
}

export default getEntities;