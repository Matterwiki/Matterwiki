import React from 'react';
import ToolbarButton from './ToolbarButton';

const BLOCK_TYPES = [
	{label: 'Heading', fa: 'fa-header', style: 'header-one'},
	{label: 'Blockquote', fa: 'fa-quote-right', style: 'blockquote'},
	{label: 'Code Block', fa: 'fa-code', style: 'code-block'},
	{label: 'UL', fa: 'fa-list-ul', style: 'unordered-list-item'},
	{label: 'OL', fa: 'fa-list-ol', style: 'ordered-list-item'}
];

const BlockControls = ({editorState, toggleBlockType}) => {

	const selection = editorState.getSelection();
	// get the blockType of the block the cursor/selection is currently in
	const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

	return (
		<div className="btn-group" role="group">
			{BLOCK_TYPES.map(type =>
				<ToolbarButton
					key={type.label}
					active={blockType === type.style}
					onToggle={toggleBlockType}
					label={type.label}
					style={type.style}
					fa={type.fa}
				/>
			)}
		</div>
	)
}

export default BlockControls;
