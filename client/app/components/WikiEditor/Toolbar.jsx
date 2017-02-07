import React, {Component} from 'react';
import {RichUtils} from 'draft-js';
import ToolbarButton from './ToolbarButton.jsx';

const INLINE_TYPES = [
	{label: 'Bold', fa: 'fa-bold', style: 'BOLD'},
	{label: 'Italic', fa: 'fa-italic',  style: 'ITALIC'},
	{label: 'Strikethrough', fa: 'fa-strikethrough', style: 'STRIKETHROUGH'},
];

const InlineControls = ({editorState, onToggle}) => {

	let currentStyle = editorState.getCurrentInlineStyle();

	return (
		<div className="btn-group" role="group">
			{INLINE_TYPES.map(type => 
				<ToolbarButton 
					key={type.label}
					active={currentStyle.has(type.style)}
					onToggle={onToggle}
					label={type.label}
					style={type.style}
					fa={type.fa}
				/>
			)}
		</div>
	);
}


const BLOCK_TYPES = [
	{label: 'Heading', fa: 'fa-header', style: 'header-one'},
	{label: 'Blockquote', fa: 'fa-quote-right', style: 'blockquote'},
	{label: 'Code Block', fa: 'fa-code', style: 'code-block'},	 
  	{label: 'UL', fa: 'fa-list-ul', style: 'unordered-list-item'},
  	{label: 'OL', fa: 'fa-list-ol', style: 'ordered-list-item'},
];

const BlockControls = ({editorState, onToggle}) => {

	const selection = editorState.getSelection();
	// get the blockType of the block the cursor/selection is currently in 
	const blockType = editorState
								.getCurrentContent()
								.getBlockForKey(selection.getStartKey())
								.getType();
	return (
		<div className="btn-group" role="group">
			{BLOCK_TYPES.map(type => 
				<ToolbarButton 
					key={type.label}
					active={blockType === type.style}
					onToggle={onToggle}
					label={type.label}
					style={type.style}
					fa={type.fa}
				/>
			)}
		</div>
	)

}

export default class Toolbar extends Component {

	constructor(...args) {
		super(...args);

		this.toggleBlockType = (blockType) => this._toggleBlockType(blockType);
		this.toggleInlineStyle = (inlineStyle) => this._toggleInlineStyle(inlineStyle);
	}



	_toggleBlockType(blockType) {
		const {onChange, editorState} = this.props;
		
		onChange(
			RichUtils.toggleBlockType(
				editorState,
				blockType
			)
		);
	}

	_toggleInlineStyle(inlineStyle) {
		const {onChange, editorState} = this.props;

		onChange(
			RichUtils.toggleInlineStyle(
				editorState,
				inlineStyle
			)
		);
	}


	render() {

		const {editorState} = this.props;

		return (
			<div className="btn-toolbar" role="toolbar">
				<InlineControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
				<BlockControls editorState={editorState}  onToggle={this.toggleBlockType}/>
			</div>
		);
	}
}

