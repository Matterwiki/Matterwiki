import React from 'react';
import {Button} from 'react-bootstrap';

const ImageControl = (props) => { 

	// a hack to make the label look like a toolbar button 
	const classNames = "custom-file-upload custom-file-upload toolbar-button btn btn-lg btn-default";

	return (
		<div className="btn-group" role="group">
			<label 
				className={classNames}>              
    			<input type="file"/>
    			<i className="fa fa-picture-o"></i>
            </label> 
		</div>
	);
}

export default ImageControl;