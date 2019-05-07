import React from 'react'
import './QueuePad.css';

const QueuePad = ({keyCode, isActive, hasSound, onClick}) => {
	return (
		<div className={`queue-pad ${isActive ? 'active' : ''} ${hasSound ? 'has-sound' : ''}`} onClick={onClick}></div>
	);
}

export default QueuePad;