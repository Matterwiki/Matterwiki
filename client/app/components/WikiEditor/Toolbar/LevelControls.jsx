import React from 'react';
import ToolbarButton from './ToolbarButton.jsx';
import {getDisabledLevelButtons} from '../helpers/index.js';


const LevelControls = ({editorState, toggleLevelType}) => {
	const onDecreaseLevel = () => toggleLevelType(-1);
	const onIncreaseLevel = () => toggleLevelType(1);
	const {disableOutdent, disableIndent} = getDisabledLevelButtons(editorState);


	return (
		<div className="btn-group" role="group">
			<ToolbarButton
				onToggle={onDecreaseLevel}
				disabled={disableOutdent}
				label='Decrease Level'
				style='outdent'
				fa='fa-outdent'
			/>
			<ToolbarButton
				onToggle={onIncreaseLevel}
				disabled={disableIndent}
				label='Increase Level'
				style='indent'
				fa='fa-indent'
			/>
		</div>
	)
}

export default LevelControls;