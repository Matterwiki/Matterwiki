import React, {Component} from 'react';
import {Editor,
        EditorState,
        RichUtils,
        CompositeDecorator,
        convertToRaw,
        convertFromRaw,
        convertFromHTML,
        ContentState} from 'draft-js';

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

    // was invoked via "edit" article, not when an article is created
    if(this.props.rawContent) {

      let contentState = null;

      // for backward compatibility
      // TODO remove this later
      if(this.props.isHtml) {
        const blocksFromHTML = convertFromHTML(this.props.rawContent);
        contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );

      } else {
        contentState = convertFromRaw(this.props.rawContent)
      }

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
    // saving the content after every change event doesn't look efficient
    // TODO make this better
    const rawContent = convertToRaw(editorState.getCurrentContent());
    this.props.onContentChange(rawContent);
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
    const editorProps = {
      ref: "editor",
      customStyleMap: styleMap,
      editorState: editorState,
      onChange: this.onChange,
      handleKeyCommand: this.handleKeyCommand,
      placeholder: "Start writing here...."
    }
    let ToolbarComponent = (
      <Toolbar
        editorState={editorState}
        onChange={this.onChange}
        />
    );

    let EditorComponent = (
      <Editor {...editorProps} />
    );

    if(this.props.readOnly) {
      ToolbarComponent = null;
      EditorComponent = (
        <div className="readonly">
   				<Editor
            readOnly
            {...editorProps}
				  />
        </div>
      );
    }

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'WikiEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' WikiEditor-hidePlaceholder';
      }
    }

		return (
			<div className="WikiEditor-root">
        <div className="WikiEditor-toolbar">
          {ToolbarComponent}
        </div>
        <div className={className} onClick={this.focus}>
          {EditorComponent}
        </div>
			</div>
		)

	}
}

export default WikiEditor;
