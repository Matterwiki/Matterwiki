import React, {Component} from 'react';
import {RichUtils, EditorState} from 'draft-js';
// TODO transition this to the entire codebase. react-bootstrap FTW!
import { Popover, OverlayTrigger, Button, ButtonGroup } from 'react-bootstrap';

// InlineControls & BlockControls are stateless components, but this one isnt.
// TODO how do we get over this? How do we make this stateless as well?
import ToolbarButton from './ToolbarButton.jsx';

class LinkControl extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      url : ''
    }


    this.handleLinkChange = (e) => this._handleLinkChange(e);
    this.handleLinkPopupOpen = (e) => this._handleLinkPopupOpen(e);
    this.handleLinkSave = (e) => this._handleLinkSave(e);
    this.handleLinkRemove = (e) => this._handleLinkRemove(e);
  }

  _handleLinkChange(e) {
    this.setState({
      url : e.target.value
    });
  }

  _handleLinkPopupOpen() {

    const {editorState, currentEntity} = this.props;

    let url = '';
    if(currentEntity) {
       url = currentEntity.getData().url;
    }

    this.setState({url});
  }

  _handleLinkSave (e) {
    e.preventDefault();
    this.props.onAddLink(this.state.url);
    this.setState({
      url : ''
    });
  }

  _handleLinkRemove (e) {
    e.preventDefault();
    this.props.onRemoveLink();
    this.setState({
      url : ''
    });
  }



  render() {

    const {editorState, currentEntity} = this.props;
    const {url} = this.state;

    const popover = (
        <Popover id="link-popover">
          <input 
                  type="text"
                  placeholder="Enter a URL.."
                  value={url}
                  onChange={this.handleLinkChange} />
          <ButtonGroup className="pull-right">
              <Button className="btn-sm toolbar-button" onClick={this.handleLinkSave}>Link</Button>
              <Button className="btn-sm toolbar-button" onClick={this.handleLinkRemove}>Unlink</Button>
          </ButtonGroup>
        </Popover>
    );

    
    const isLinkEntity = (currentEntity && currentEntity.getType() === 'LINK') || false;
    const activeClass = (isLinkEntity ? "active" : "");
    const toolbarButtonClass = `btn-default ${activeClass} btn-lg toolbar-button`;
 
    return (
      <ButtonGroup>
        <OverlayTrigger 
            trigger="click"
            placement="bottom"
            onEnter={this.handleLinkPopupOpen}
            overlay={popover}
            rootClose={true}>
           <Button className={toolbarButtonClass} >
              <i className="fa fa-link"></i>
          </Button>    
        </OverlayTrigger>
      </ButtonGroup>
    );
  }
}

export default LinkControl;
