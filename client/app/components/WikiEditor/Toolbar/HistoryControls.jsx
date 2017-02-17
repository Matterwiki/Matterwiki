import React from 'react';
import ToolbarButton from './ToolbarButton.jsx';

const HistoryControls = ({onUndo, onRedo}) => {

	return (
		<div className="btn-group" role="group">

				<ToolbarButton
					key='Undo'
					onToggle={onUndo}
					label='Undo'
					fa='fa-undo'
				/>
        <ToolbarButton
          key='Redo'
          onToggle={onRedo}
          label='Redo'
          fa='fa-repeat'
        />
		</div>
	)
}

export default HistoryControls;
