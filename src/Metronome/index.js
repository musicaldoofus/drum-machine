import React from 'react';
import arrowBtn from '../media/img/btn-arrow.png';
import './Metronome.css';

const Metronome = (props) => {
	return (
		<div className="metronome">
			<button className="btn metronome-btn up" onClick={() => props.handleUpdateTempo(1)}>
				<img src={arrowBtn} alt="Increase the tempo"/>
			</button>
			<div>
				{props.currentTempo}
			</div>
			<button className="btn metronome-btn down" onClick={() => props.handleUpdateTempo(-1)}>
				<img src={arrowBtn} alt="Increase the tempo"/>
			</button>
		</div>
	);
}

export default Metronome;