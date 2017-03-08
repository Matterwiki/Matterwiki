import React from 'react';
import InlineControls from './InlineControls.jsx';
import BlockControls from './BlockControls.jsx';
import LevelControls from './LevelControls.jsx';
import LinkControl from './LinkControl.jsx';
import HistoryControls from './HistoryControls.jsx';
import ImageControl from './ImageControl.jsx';

const Toolbar = (props) => {
	// TODO perhaps group LinkControl and InlineControl as `EntityControls`?
	return (
		<div className="btn-toolbar" role="toolbar">
			<InlineControls {...props}/>
			<LinkControl {...props}/>			
			<ImageControl {...props} />
			<BlockControls {...props}/>
			<LevelControls {...props}/>
			<HistoryControls {...props}/>
		</div>
	);
}

export default Toolbar;



