import React from 'react';
import ToolbarButton from './ToolbarButton.jsx';

const ImageControl = (props) => { 
	return (
		<div className="btn-group" role="group">
			<ToolbarButton
				key='image-control'
				label='Upload image'
				fa='fa-picture-o'
			/>
		</div>
	);
}

export default ImageControl;