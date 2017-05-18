import React from 'react';
import {FaIndent, FaDedent} from "react-icons/lib/fa"
import ToolbarButton from './ToolbarButton';
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
				fa={FaDedent}
			/>
			<ToolbarButton
				onToggle={onIncreaseLevel}
				disabled={disableIndent}
				label='Increase Level'
				style='indent'
				fa={FaIndent}
			/>
		</div>
	)
}

export default LevelControls;