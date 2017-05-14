import React from 'react';
import InlineControls from './InlineControls';
import BlockControls from './BlockControls';
import LevelControls from './LevelControls';
import LinkControl from './LinkControl';
import HistoryControls from './HistoryControls';

const Toolbar = (props) => {
	return (
		<div className="btn-toolbar" role="toolbar">
			<InlineControls {...props}/>
			<LinkControl {...props}/>
			<BlockControls {...props}/>
			<LevelControls {...props}/>
			<HistoryControls {...props}/>
		</div>
	);
}

export default Toolbar;