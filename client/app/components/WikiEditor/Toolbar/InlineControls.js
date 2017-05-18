import React from "react";
import { FaBold, FaItalic, FaStrikethrough } from "react-icons/lib/fa";
import ToolbarButton from "./ToolbarButton";

const INLINE_TYPES = [
  { label: "Bold", fa: FaBold, style: "BOLD" },
  { label: "Italic", fa: FaItalic, style: "ITALIC" },
  { label: "Strikethrough", fa: FaStrikethrough, style: "STRIKETHROUGH" }
];

const InlineControls = ({ editorState, toggleInlineStyle }) => {
  let currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="btn-group" role="group">
      {INLINE_TYPES.map(type => (
        <ToolbarButton
          key={type.label}
          active={currentStyle.has(type.style)}
          onToggle={toggleInlineStyle}
          label={type.label}
          style={type.style}
          fa={type.fa}
        />
      ))}
    </div>
  );
};

export default InlineControls;
