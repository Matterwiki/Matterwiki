import { EditorState, ContentState, convertFromHTML, convertFromRaw } from "draft-js";

const convertToEditorState = (rawContent, isHtml, decorator) => {
  let editorState = EditorState.createEmpty(decorator);

  // was invoked via "edit" article, not when an article is created
  if (rawContent) {
    let contentState = null;

    // for backward compatibility
    // TODO remove this later
    if (isHtml) {
      const blocksFromHTML = convertFromHTML(rawContent);
      contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
    } else {
      contentState = convertFromRaw(rawContent);
    }

    editorState = EditorState.createWithContent(contentState, decorator);
  }

  return editorState;
};

export default convertToEditorState;
