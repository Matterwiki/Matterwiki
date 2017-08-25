const getCurrentEntityKey = editorState => {
  const contentState = editorState.getCurrentContent();
  const startKey = editorState.getSelection().getStartKey();
  const startOffset = editorState.getSelection().getStartOffset();
  const blockWithEntity = contentState.getBlockForKey(startKey);
  const linkKey = blockWithEntity.getEntityAt(startOffset);

  return linkKey;
};

export default getCurrentEntityKey;
