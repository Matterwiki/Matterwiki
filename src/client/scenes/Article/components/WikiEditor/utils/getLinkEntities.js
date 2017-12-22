const getLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();

    return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
  }, callback);
};

export default getLinkEntities;
