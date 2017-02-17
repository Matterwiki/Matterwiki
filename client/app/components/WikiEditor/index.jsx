import React, {Component} from 'react';
import {Editor, EditorState, RichUtils, CompositeDecorator, convertToRaw, ContentState} from 'draft-js';

// Couldn't we just save JSON instead?
// TODO must think about this

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

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

    let editorState = EditorState.createEmpty(decorator);

    if(this.props.rawHtml) {
      const blocksFromHTML = htmlToDraft(this.props.rawHtml);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState, decorator);
    }

		this.state = {
			editorState
		}

		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => this._onChange(editorState);
	}

  _onChange(editorState) {
    this.setState({editorState});
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const rawHtml = draftToHtml(rawContent);
    this.props.onChangeHtml(rawHtml);
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
