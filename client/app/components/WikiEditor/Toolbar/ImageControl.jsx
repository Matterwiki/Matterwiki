import React from 'react';

const ImageControl = () => {
	<ToolbarButton
		key={type.label}
		active={currentStyle.has(type.style)}
		onToggle={toggleInlineStyle}
		label={type.label}
		style={type.style}
		fa={type.fa}
	/>
}