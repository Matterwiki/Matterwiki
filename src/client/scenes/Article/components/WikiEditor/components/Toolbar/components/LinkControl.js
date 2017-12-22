import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import FaExternalLink from "react-icons/lib/fa/external-link";
// TODO transition this to the entire codebase.
import { Popover, Overlay, Button, ButtonGroup } from "react-bootstrap";

class LinkControl extends Component {
  state = {
    url: "",
    showPopup: null
  };

  onURLChange = e => {
    this.setState({
      url: e.target.value
    });
  };

  handleLinkPopupOpen = () => {
    const { currentEntity } = this.props;

    let url = "";
    if (currentEntity) {
      url = currentEntity.getData().url;
    }

    this.setState({
      url,
      showPopup: true
    });

    // hack to defer focus to after <Overlay/> has been mounted
    setTimeout(() => {
      this.linkURL.focus();
    }, 0);
  };

  handleLinkSave = e => {
    e.preventDefault();

    const { url } = this.state;
    const { onAddLink } = this.props;

    onAddLink(url);
    this.resetPopoverState();
  };

  handleLinkRemove = e => {
    e.preventDefault();

    const { onRemoveLink } = this.props;

    onRemoveLink();
    this.resetPopoverState();
  };

  resetPopoverState = () => {
    this.setState({
      url: "",
      showPopup: false
    });
  };

  render() {
    const { currentEntity } = this.props;
    const { url, showPopup } = this.state;

    // TODO make this a separate component
    const popover = (
      <Overlay
        show={showPopup}
        placement="bottom"
        target={() => ReactDOM.findDOMNode(this.targetButton)}
        onHide={this.resetPopoverState}
        rootClose>
        <Popover id="link-popover">
          <input
            type="text"
            placeholder="Enter a URL.."
            ref={input => (this.linkURL = input)}
            value={url}
            onChange={this.onURLChange}
          />
          <ButtonGroup className="pull-right">
            <Button bsSize="sm" className="toolbar-button" onClick={this.handleLinkSave}>
              Link
            </Button>
            <Button bsSize="sm" className="toolbar-button" onClick={this.handleLinkRemove}>
              Unlink
            </Button>
          </ButtonGroup>
        </Popover>
      </Overlay>
    );

    const isLinkEntity = (currentEntity && currentEntity.getType() === "LINK") || false;
    const toolbarButtonClass = classNames(
      {
        active: isLinkEntity
      },
      "toolbar-button"
    );

    return (
      <div>
        <ButtonGroup>
          <Button
            ref={_ref => (this.targetButton = _ref)}
            bsStyle="default"
            bsSize="lg"
            className={toolbarButtonClass}
            onClick={this.handleLinkPopupOpen}>
            <FaExternalLink />
          </Button>
        </ButtonGroup>
        {popover}
      </div>
    );
  }
}

export default LinkControl;
