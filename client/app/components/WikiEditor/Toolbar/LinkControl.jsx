import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {RichUtils, EditorState} from 'draft-js';
// TODO transition this to the entire codebase. react-bootstrap FTW!
import { Popover, Overlay, Button, ButtonGroup } from 'react-bootstrap';

// InlineControls & BlockControls are stateless components, but this one isnt.
// TODO how do we get over this? How do we make this stateless as well?
// TODO Make this use <ToolbarButton /> component

class LinkControl extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      url : '',
      showPopup : null
    }

    // for the URL change
    this.onURLChange = (e) => this._onURLChange(e);

    this.handleLinkPopupOpen = (e) => this._handleLinkPopupOpen(e);
    this.resetPopoverState = () => this._resetPopoverState();

    // Link and Unlink buttons    
    this.handleLinkSave = (e) => this._handleLinkSave(e);
    this.handleLinkRemove = (e) => this._handleLinkRemove(e);
  }

  _onURLChange(e) {
    this.setState({
      url : e.target.value
    });
  }

  _handleLinkPopupOpen() {

    const {currentEntity} = this.props;
    const {showPopup} = this.state;

    let url = '';
    if(currentEntity) {
       url = currentEntity.getData().url;
    }    

    this.setState({
      url, 
      showPopup : true 
    });

    // hack to defer focus to after <Overlay/> has been mounted 
    setTimeout(() => {
      this.linkURL.focus();
    }, 0)
  }

  _handleLinkSave (e) {
    e.preventDefault();

    const {url, showPopup} = this.state;
    const {onAddLink} = this.props;

    onAddLink(url);
    this.resetPopoverState();
  }

  _handleLinkRemove (e) {
    e.preventDefault();

    const {onRemoveLink} = this.props;

    onRemoveLink();
    this.resetPopoverState();

  }

  _resetPopoverState() {
    this.setState({
      url : '',
      showPopup : false
    });
  }

  render() {

    const {editorState, currentEntity} = this.props;
    const {url, showPopup} = this.state;

    // TODO make this a separate component
    const popover = (
      <Overlay 
          show={showPopup}
          placement="bottom"
          target={() => ReactDOM.findDOMNode(this.refs.target)}
          onHide={this.resetPopoverState}
          rootClose={true}>
        <Popover id="link-popover">
          <input 
            type="text"
            placeholder="Enter a URL.."
            ref={(input) => this.linkURL = input}
            value={url}
            onChange={this.onURLChange} />
          <ButtonGroup className="pull-right">
              <Button bsSize="sm" className="toolbar-button" onClick={this.handleLinkSave}>Link</Button>
              <Button bsSize="sm" className="toolbar-button" onClick={this.handleLinkRemove}>Unlink</Button>
          </ButtonGroup>
        </Popover>
      </Overlay>
    );

    
    const isLinkEntity = (currentEntity && currentEntity.getType() === 'LINK') || false;
    const activeClass = (isLinkEntity ? "active" : "");
    const toolbarButtonClass = `${activeClass} toolbar-button`;
 
    return (
      <div>
        <ButtonGroup>
           <Button 
              ref="target" 
              bsStyle="default"
              bsSize="lg"
              className={toolbarButtonClass} 
              onClick={this.handleLinkPopupOpen}>
              <i className="fa fa-link"></i>
            </Button>    
        </ButtonGroup>
        {popover}
      </div>
    );
  }
}

export default LinkControl;
