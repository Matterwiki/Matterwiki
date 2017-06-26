import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { FaBold, FaItalic, FaStrikethrough } from "react-icons/lib/fa";
import ToolbarButton from "./ToolbarButton";

const INLINE_TYPES = [
  { label: "Bold", fa: FaBold, style: "BOLD" },
  { label: "Italic", fa: FaItalic, style: "ITALIC" },
  { label: "Strikethrough", fa: FaStrikethrough, style: "STRIKETHROUGH" }
];

const InlineControls = ({ editorState, toggleInlineStyle }) => (
  <ButtonGroup>
    {INLINE_TYPES.map(type => (
      <ToolbarButton
        key={type.label}
        active={editorState.getCurrentInlineStyle().has(type.style)}
        onToggle={toggleInlineStyle}
        label={type.label}
        style={type.style}
        fa={type.fa}
      />
    ))}
  </ButtonGroup>
);

export default InlineControls;
