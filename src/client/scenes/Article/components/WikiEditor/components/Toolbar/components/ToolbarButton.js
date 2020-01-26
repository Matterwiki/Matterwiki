import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import classNames from 'classnames'

class ToolbarButton extends Component {
  handleToggle = evt => {
    evt.preventDefault()
    this.props.handleToggle(this.props.styleName)
  };

  render () {
    const toolbarButtonClass = classNames(
      {
        active: this.props.active
      },
      'toolbar-button'
    )
    const FontIcon = this.props.fa

    return (
      <Button
        bsStyle='default'
        bsSize='lg'
        className={toolbarButtonClass}
        onMouseDown={this.handleToggle}
        title={this.props.label}
        disabled={this.props.disabled}
      >
        <FontIcon />
      </Button>
    )
  }
}

export default ToolbarButton
