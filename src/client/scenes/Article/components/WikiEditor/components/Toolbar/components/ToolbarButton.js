import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classNames from "classnames";

class ToolbarButton extends Component {
  onToggle = evt => {
    evt.preventDefault();
    this.props.onToggle(this.props.styleName);
  };

  render() {
    const toolbarButtonClass = classNames(
      {
        active: this.props.active
      },
      "toolbar-button"
    );
    const FontIcon = this.props.fa;

    return (
      <Button
        bsStyle="default"
        bsSize="lg"
        className={toolbarButtonClass}
        onMouseDown={this.onToggle}
        title={this.props.label}
        disabled={this.props.disabled}>
        <FontIcon />
      </Button>
    );
  }
}

export default ToolbarButton;
