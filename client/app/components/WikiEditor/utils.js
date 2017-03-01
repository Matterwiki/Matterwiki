import {EditorState, 
        ContentState, 
        convertFromHTML, 
        convertFromRaw} from 'draft-js';


export const getLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}


export const convertToEditorState = (rawContent, isHtml, decorator) => {
    let editorState = EditorState.createEmpty(decorator);

    // was invoked via "edit" article, not when an article is created
    if(rawContent) {

      let contentState = null;

      // for backward compatibility
      // TODO remove this later
      if(isHtml) {
        const blocksFromHTML = convertFromHTML(rawContent);
        contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );

      } else {
        contentState = convertFromRaw(rawContent)
      }

      editorState = EditorState.createWithContent(contentState, decorator);
    }

    return editorState;
}


export const shouldHidePlaceholder = (contentState) => {
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      return true;
    }
  }

  return false;
} 

export const getCurrentEntityKey = (editorState) => {

    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithEntity = contentState.getBlockForKey(startKey);
    const linkKey = blockWithEntity.getEntityAt(startOffset);

    return linkKey;

 }   


// TODO must refactor this
export const getDisabledLevelButtons = (editorState) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const blockKey = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(blockKey);
  const previousBlock = contentState.getBlockBefore(blockKey);

  let disableIndent = true;
  let disableOutdent = true;


  const currentBlockDepth = currentBlock? currentBlock.getDepth() : null;
  const previousBlockDepth = previousBlock? previousBlock.getDepth() : null;
  const currentBlockType = currentBlock ? currentBlock.getType() : null;
  const previousBlockType = previousBlock ? previousBlock.getType() : null;

  // could become a regex soon!
  if (currentBlockType === 'unordered-list-item' || 
    currentBlockType === 'ordered-list-item') {
    
    if (previousBlockType === currentBlockType) {
      disableIndent = false;
      disableOutdent = true;

      if (previousBlockDepth !== currentBlockDepth && currentBlockDepth !== 0) {
        disableOutdent = false;
        disableIndent = true;
      } else if(previousBlockDepth === currentBlockDepth && currentBlockDepth !==0) {
        disableOutdent = false;
        disableIndent = false;
      }

    } 
  }

  return {
    disableIndent,
    disableOutdent
  };
}


