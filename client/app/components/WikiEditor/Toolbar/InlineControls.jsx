import React from 'react';
import ToolbarButton from './ToolbarButton.jsx';

const INLINE_TYPES = [
	{label: 'Bold', fa: 'fa-bold', style: 'BOLD'},
	{label: 'Italic', fa: 'fa-italic',  style: 'ITALIC'},
	{label: 'Strikethrough', fa: 'fa-strikethrough', style: 'STRIKETHROUGH'},
];

const InlineControls = ({editorState, toggleInlineStyle}) => {

	let currentStyle = editorState.getCurrentInlineStyle();

	return (
		<div className="btn-group" role="group">
			{INLINE_TYPES.map(type =>
				<ToolbarButton
					key={type.label}
					active={currentStyle.has(type.style)}
					onToggle={toggleInlineStyle}
					label={type.label}
					style={type.style}
					fa={type.fa}
				/>
			)}
		</div>
	);
}

export default InlineControls;
