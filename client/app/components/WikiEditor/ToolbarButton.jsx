import React, {Component} from 'react';

export default class Toolbar extends Component {

	constructor(...args) {
		super(...args);

		this.onToggle = (evt) => {
			evt.preventDefault();

			this.props.onToggle(this.props.style);
		}
	}


	render() {
		const activeClass = "btn "+ this.props.active ? "btn-primary" : "btn-default";
		const fontIcon = "fa " + this.props.fa;
		
		return (
			<a className={activeClass} href="#" onClick={this.onToggle}>
    			<i className={fontIcon} title={this.props.label}></i>
  			</a>
		);
	}
}