import React, {Component} from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

import Toolbar from './Toolbar.jsx';

const styleMap = {
  STRIKETHROUGH : {
    textDecoration : 'line-through'
  }
};


class WikiEditor extends Component {
	constructor(...args) {
		super(...args);

		this.state = {
			editorState : EditorState.createEmpty()
		}

		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    	this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => this.setState({editorState});
	}

	_handleKeyCommand (cmd) {
		const {editorState} = this.state;

		const newState = RichUtils.handleKeyCommand(editorState, cmd)

		if(newState) {
			this.onChange(newState);
			return true;
		}

		return false;
	}


	render() {

		const {editorState} = this.state;

		return (
			<div>
				<Toolbar
					editorState={editorState}
					onChange={this.onChange}
				/>
				<Editor
					ref="editor"
					customStyleMap={styleMap}
					editorState={editorState}
					onChange={this.onChange}
					handleKeyCommand={this.handleKeyCommand}
					placeholder="Start writing here...."
				/>
			</div>
		)

	}
}

export default WikiEditor;
