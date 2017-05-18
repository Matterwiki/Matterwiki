import React from "react";
import { FaRotateLeft, FaRepeat } from "react-icons/lib/fa";
import ToolbarButton from "./ToolbarButton";

const HistoryControls = ({ editorState, onUndo, onRedo }) => {
  return (
    <div className="btn-group" role="group">

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
    </div>
  );
};

export default HistoryControls;
