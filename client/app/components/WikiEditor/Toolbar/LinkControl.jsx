import React, {Component} from 'react';
import {RichUtils, EditorState, SelectionState} from 'draft-js';
// TODO transition this to the entire codebase. react-bootstrap FTW!
import { Popover, OverlayTrigger, Button, ButtonGroup } from 'react-bootstrap';

// InlineControls & BlockControls are stateless components, but this one is.
// TODO how do we get over this? How do we make this stateless as well?

// this doesn't use the ToolbarButton component.
// TODO find a unified way to do this
class LinkControl extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      url : ''
    }


    this.handleLinkChange = (e) => this._handleLinkChange(e);
    this.handleLinkPopup = (e) => this._handleLinkPopup(e);
    this.handleLinkSave = (e) => this._handleLinkSave(e);
    this.handleLinkRemove = (e) => this._handleLinkRemove(e);
  }

  _handleLinkChange(e) {
    this.setState({
      url : e.target.value
    });
  }

  _handleLinkPopup() {

    const {editorState} = this.props;

    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithEntity = contentState.getBlockForKey(startKey);
    const linkKey = blockWithEntity.getEntityAt(startOffset);

    let url = '';
    if (linkKey) {
       const linkInstance = contentState.getEntity(linkKey);
       url = linkInstance.getData().url;
    }

    this.setState({url});
  }

  _handleLinkSave (e) {
    e.preventDefault();
    this.props.onAddLink(this.state.url);
    setTimeout(() => this.setState({
      url : ''
    }), 0);
  }

  _handleLinkRemove (e) {
    e.preventDefault();
    this.props.onRemoveLink();
    setTimeout(() => this.setState({
      url : ''
    }), 0);
  }



  render() {
    const popover = (
        <Popover id="link-popover">
          <input type="text"
                  placeholder="Enter a URL.."
                  value={this.state.url}
                  onChange={this.handleLinkChange} />
          <ButtonGroup className="pull-right">
              <Button className="btn-sm toolbar-button" onClick={this.handleLinkSave}>Link</Button>
              <Button className="btn-sm toolbar-button" onClick={this.handleLinkRemove}>Unlink</Button>
          </ButtonGroup>
        </Popover>
    );

    const {editorState} = this.props;

    // The logic here seems redundant..
    // TODO Find a way to combine this logic with `handleLinkPopup()`

    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithEntity = contentState.getBlockForKey(startKey);
    const linkKey = blockWithEntity.getEntityAt(startOffset);

    let active = false;
    if (linkKey) {
       const linkInstance = contentState.getEntity(linkKey);
       active = (linkInstance.getType() === 'LINK');
    }

    const activeClass = (active ? "active" : "");
    const toolbarButtonClass = `btn-default ${activeClass} btn-lg toolbar-button`;

    return (
      <div className="btn-group" role="group">
        <OverlayTrigger trigger="click"
                        placement="bottom"
                        onEnter={this.handleLinkPopup}
                        overlay={popover}
                        rootClose={true}>
            <Button className={toolbarButtonClass} >
              <i className="fa fa-link"></i>
            </Button>
        </OverlayTrigger>
      </div>
    );
  }
}

export default LinkControl;
