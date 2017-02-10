import React, {Component} from 'react';
import {Editor, EditorState, RichUtils, CompositeDecorator} from 'draft-js';

import Toolbar from './Toolbar/index.jsx';

const styleMap = {
  STRIKETHROUGH : {
    textDecoration : 'line-through'
  }
};

const getLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children || url}
    </a>
  );
}

class WikiEditor extends Component {
	constructor(...args) {
		super(...args);

    const decorator = new CompositeDecorator([
      {
        strategy : getLinkEntities,
        component : Link
      }
    ]);

		this.state = {
			editorState : EditorState.createEmpty(decorator)
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
