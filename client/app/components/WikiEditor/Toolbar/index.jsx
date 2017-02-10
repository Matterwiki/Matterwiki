import React, {Component} from 'react';
import {RichUtils, EditorState, Modifier} from 'draft-js';
import {changeDepth} from 'draftjs-utils';
import InlineControls from './InlineControls.jsx';
import BlockControls from './BlockControls.jsx';
import LinkControl from './LinkControl.jsx';

export default class Toolbar extends Component {

	constructor(...args) {
		super(...args);

		this.toggleBlockType = (blockType) => this._toggleBlockType(blockType);
		this.toggleInlineStyle = (inlineStyle) => this._toggleInlineStyle(inlineStyle);
		this.toggleLink = (linkData) => this._toggleLink(linkData);
	}


	_toggleBlockType(blockType) {
		const {onChange, editorState} = this.props;

		const newState =
					// if
					blockType === 'indent' ? changeDepth(editorState, 1, 4) :
					// else if
					blockType === 'outdent' ? changeDepth(editorState, -1, 4) :
					// else
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

	_toggleLink(url) {
		const {editorState, onChange} = this.props;
		const contentState = editorState.getCurrentContent();

		// create the entity. returns a new ContentState object that must be pushed back into the editor
		let contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {url});

		// get the entity key, so that..
		// ..1) if there is no selected range, use the Modifier API (see below) OR....
		// ..2) Now that there is some selected text, RichUtils could be used to toggle selected text with entityKey's type

		const entityKey = contentState.getLastCreatedEntityKey();

		const selection = editorState.getSelection();
		if(selection.isCollapsed()) {
			contentStateWithEntity = Modifier.insertText(contentStateWithEntity, selection, url, null, entityKey);
		}

		// create a new EditorState
		const newEditorState = EditorState.set(editorState, {
			currentContent : contentStateWithEntity
		});


		onChange(
				RichUtils.toggleLink(
					newEditorState,
					newEditorState.getSelection(),
					entityKey
				)
		);

	}

	render() {

		const {editorState, focusEditor} = this.props;

		return (
			<div className="btn-toolbar DraftEditor-toolbar" role="toolbar">
				<InlineControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
				<LinkControl editorState={editorState} onToggle={this.toggleLink}/>
				<BlockControls editorState={editorState}  onToggle={this.toggleBlockType}/>
			</div>
		);
	}
}
