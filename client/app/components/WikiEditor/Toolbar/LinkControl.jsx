import React, {Component} from 'react';
import {RichUtils, EditorState} from 'draft-js';
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
    this.handleOnEnter = (e) => this._handleOnEnter(e);
    this.confirmLinkSave = (e) => this._confirmLinkSave(e);
  }

  _handleLinkChange(e) {
    this.setState({
      url : e.target.value
    });
  }

  _handleOnEnter(e) {
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
        const contentState = editorState.getCurrentContent();
        const startKey = editorState.getSelection().getStartKey();
        const startOffset = editorState.getSelection().getStartOffset();
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

        let url = '';
        if (linkKey) {
          const linkInstance = contentState.getEntity(linkKey);
          url = linkInstance.getData().url;
        }
        console.log(0)
        this.setState({url});
    }

  }

  _confirmLinkSave (e) {
    e.preventDefault();
    this.props.onToggle(this.state.url);
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
              <Button className="btn-sm toolbar-button" onClick={this.confirmLinkSave}>Link</Button>
              <Button className="btn-sm toolbar-button">Unlink</Button>
          </ButtonGroup>
        </Popover>
    );



    return (
      <div className="btn-group" role="group">
        <OverlayTrigger trigger="click" placement="bottom" onEnter={this.handleOnEnter} overlay={popover} rootClose={true}>
            <Button className="btn-default btn-lg toolbar-button" >
              <i className="fa fa-link"></i>
            </Button>
        </OverlayTrigger>
      </div>
    );
  }
}

export default LinkControl;
