import React from 'react';
import InlineControls from './InlineControls.jsx';
import BlockControls from './BlockControls.jsx';
import LinkControl from './LinkControl.jsx';
import HistoryControls from './HistoryControls.jsx';


const Toolbar = (props) => {

	return (
		<div className="btn-toolbar" role="toolbar">
			<InlineControls {...props}/>
			<LinkControl {...props}/>
			<BlockControls {...props}/>
			<HistoryControls {...props}/>
		</div>
	);
}


export default Toolbar;



