import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { FaRotateLeft, FaRepeat } from "react-icons/lib/fa";
import ToolbarButton from "./ToolbarButton";

const HistoryControls = ({ editorState, onUndo, onRedo }) => (
  <ButtonGroup>
    <ToolbarButton
      key="Undo"
      onToggle={onUndo}
      label="Undo"
      fa={FaRotateLeft}
      disabled={editorState.getUndoStack().size === 0}
    />
    <ToolbarButton
      key="Redo"
      onToggle={onRedo}
      label="Redo"
      fa={FaRepeat}
      disabled={editorState.getRedoStack().size === 0}
    />
  </ButtonGroup>
);

export default HistoryControls;
