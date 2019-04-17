import React from 'react';

/*
props:
- src
- srcDescription
- label
- onClick
*/

//Todo:
//onClick => play audio (by state?)

const Pad = ({src, srcDescription, label, onClick}) => (
	<div onClick={onClick} className="drum-pad" id={srcDescription}>
		<audio className="clip" src={src} id={label}/>
		<div className="pad-display">
			{label}
		</div>
	</div>
);

export default Pad;