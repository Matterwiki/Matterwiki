// TODO must refactor this
const getDisabledLevelButtons = editorState => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const blockKey = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(blockKey);
  const previousBlock = contentState.getBlockBefore(blockKey);

  let disableIndent = true;
  let disableOutdent = true;

  const currentBlockDepth = currentBlock ? currentBlock.getDepth() : null;
  const previousBlockDepth = previousBlock ? previousBlock.getDepth() : null;
  const currentBlockType = currentBlock ? currentBlock.getType() : null;
  const previousBlockType = previousBlock ? previousBlock.getType() : null;

  // could become a regex soon!
  if (currentBlockType === "unordered-list-item" || currentBlockType === "ordered-list-item") {
    if (previousBlockType === currentBlockType) {
      disableIndent = false;
      disableOutdent = true;

      if (previousBlockDepth !== currentBlockDepth && currentBlockDepth !== 0) {
        disableOutdent = false;
        disableIndent = true;
      } else if (previousBlockDepth === currentBlockDepth && currentBlockDepth !== 0) {
        disableOutdent = false;
        disableIndent = false;
      }
    }
  }

  return {
    disableIndent,
    disableOutdent
  };
};

export default getDisabledLevelButtons;
