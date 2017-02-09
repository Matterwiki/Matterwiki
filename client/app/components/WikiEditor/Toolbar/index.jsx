import React, {Component} from 'react';
import {RichUtils} from 'draft-js';
import {changeDepth} from 'draftjs-utils';
import InlineControls from './InlineControls.jsx';
import BlockControls from './BlockControls.jsx';

export default class Toolbar extends Component {

	constructor(...args) {
		super(...args);

		this.toggleBlockType = (blockType) => this._toggleBlockType(blockType);
		this.toggleInlineStyle = (inlineStyle) => this._toggleInlineStyle(inlineStyle);
	}


	_toggleBlockType(blockType) {
		const {onChange, editorState} = this.props;

		const newState =
					blockType === 'indent' ? changeDepth(editorState, 1, 4) :
					blockType === 'outdent' ? changeDepth(editorState, -1, 4) :
											RichUtils.toggleBlockType(editorState, blockType);

		onChange(newState);
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
			<div className="btn-toolbar DraftEditor-toolbar" role="toolbar">
				<InlineControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
				<BlockControls editorState={editorState}  onToggle={this.toggleBlockType}/>
			</div>
		);
	}
}
