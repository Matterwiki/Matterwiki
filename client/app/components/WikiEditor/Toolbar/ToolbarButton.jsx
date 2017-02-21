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
		const activeClass = (this.props.active ? "active" : "");
		const toolbarButtonClass = `btn btn-default ${activeClass} btn-lg toolbar-button`;
		const fontIcon = `fa ${this.props.fa}`;

		return (
			<a className={toolbarButtonClass} onMouseDown={this.onToggle} title={this.props.label}>
    			<i className={fontIcon} ></i>
  			</a>
		);
	}
}
