import React, { Component } from 'react';
import Tone from 'tone';
import pianoKeys from '../helpers/pianoKeys';
import './PianoPad.css';

const PianoKey = (props) => {
	return (
		<div
			className={`piano-pad-key ${props.isWhite ? 'white' : 'black'}${props.isPressed ? ' pressed' : ''}`}
			onMouseDown={props.onMouseDown}
			onMouseUp={props.onMouseUp}
		>
		</div>
	);
}

class PianoPad extends Component {
	constructor() {
		super();
		this.synth = new Tone.Synth().toMaster();
	}
	
	componentDidMount() {
		window.addEventListener('keydown', (e) => {
			console.log(e);
			if (e.isComposing || e.keyCode === 229) return //per MDN
			e.preventDefault();
			const pianoKey = pianoKeys.filter(k => k.keyCode === e.keyCode)[0];
			if (pianoKey !== undefined) this.synth.triggerAttackRelease(pianoKey.srcDescription, '16n');
		});
	}
	
	handleKeyDown(keyCode) {

	}
	
	handleKeyUp(keyCode) {

	}
	
	play(s) {

	}
	
	stop(s) {

	}
	
	render() {
		const keys = pianoKeys.map(s => (
			<PianoKey
				key={s.label}
				{...s}
			/>
		));
		return (
			<div className="piano-pad-container">
				{keys}
			</div>
		);
	}
}

export default PianoPad;