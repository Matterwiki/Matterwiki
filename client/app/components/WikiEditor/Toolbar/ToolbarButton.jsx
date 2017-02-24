import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Toolbar extends Component {

	constructor(...args) {
		super(...args);

		this.onToggle = (evt) => {
			evt.preventDefault();
			this.props.onToggle(this.props.style);
		}
	}


	render() {
		const activeClass = (this.props.active ? "active" : "");
		const toolbarButtonClass = `${activeClass} toolbar-button`;
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
