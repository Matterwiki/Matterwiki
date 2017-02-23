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
        const blocksFromHTML = convertFromHTML(this.props.rawContent);
        contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );

      } else {
        contentState = convertFromRaw(this.props.rawContent)
      }

      editorState = EditorState.createWithContent(contentState, decorator);
    }

    return editorState;
}