import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import classNames from 'classnames';

export default class Toolbar extends Component {

	constructor(...args) {
		super(...args);

		this.onToggle = (evt) => {
			evt.preventDefault();
			this.props.onToggle(this.props.style);
		}
	}


	render() {
		const toolbarButtonClass = classNames({
			'active' : this.props.active
		}, 'toolbar-button');
		const fontIcon = `fa ${this.props.fa}`;

		return (
			<Button 
				bsStyle="default" 
				bsSize="lg" 
				className={toolbarButtonClass} 
				onMouseDown={this.onToggle} 
				title={this.props.label}
				disabled={this.props.disabled}>
    			<i className={fontIcon} ></i>
  			</Button>
		);
	}
}
