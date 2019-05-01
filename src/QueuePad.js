import React from 'react'
import './QueuePad.css';

const QueuePad = ({keyCode, isActive}) => {
	return (
		<div className={`queue-pad ${isActive ? 'active' : ''}`}>
			{keyCode}
		</div>
	);
}

export default QueuePad;