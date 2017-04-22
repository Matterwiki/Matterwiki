import React from 'react';
import InlineControls from './InlineControls.js';
import BlockControls from './BlockControls.js';
import LevelControls from './LevelControls.js';
import LinkControl from './LinkControl.js';
import HistoryControls from './HistoryControls.js';
import ImageControl from './ImageControl.js';

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
