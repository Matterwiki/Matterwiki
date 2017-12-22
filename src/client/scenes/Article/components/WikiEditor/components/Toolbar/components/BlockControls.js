import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { FaHeader, FaQuoteRight, FaCode, FaListUl, FaListOl } from "react-icons/lib/fa";

import ToolbarButton from "./ToolbarButton";

const BLOCK_TYPES = [
  { label: "Heading", fa: FaHeader, style: "header-one" },
  { label: "Blockquote", fa: FaQuoteRight, style: "blockquote" },
  { label: "Code Block", fa: FaCode, style: "code-block" },
  { label: "UL", fa: FaListUl, style: "unordered-list-item" },
  { label: "OL", fa: FaListOl, style: "ordered-list-item" }
];

const BlockControls = ({ editorState, toggleBlockType }) => {
  const selection = editorState.getSelection();
  // get the blockType of the block the cursor/selection is currently in
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <ButtonGroup>
      {BLOCK_TYPES.map(type => (
        <ToolbarButton
          key={type.label}
          active={blockType === type.style}
          onToggle={toggleBlockType}
          label={type.label}
          style={type.style}
          fa={type.fa}
        />
      ))}
    </ButtonGroup>
  );
};

export default BlockControls;
