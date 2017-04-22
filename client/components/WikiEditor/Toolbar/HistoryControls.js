import React from 'react';
import ToolbarButton from './ToolbarButton';

const HistoryControls = ({editorState, onUndo, onRedo}) => {
	return (
		<div className="btn-group" role="group">

		<ToolbarButton
			key='Undo'
			onToggle={onUndo}
			label='Undo'
			fa='fa-undo'
			disabled={editorState.getUndoStack().size === 0}
		/>
        <ToolbarButton
          key='Redo'
          onToggle={onRedo}
          label='Redo'
          fa='fa-repeat'
          disabled={editorState.getRedoStack().size === 0}
        />
		</div>
	)
}

export default HistoryControls;
