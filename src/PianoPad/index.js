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
		this.state = {
			isPressed: []
		};
		this.synth = new Tone.PolySynth().toMaster();
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.play = this.play.bind(this);
		this.release = this.release.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);
	}
	
	handleKeyDown(e) {
		if (e.isComposing || e.keyCode === 229) return //per MDN
		e.preventDefault();
		const pianoKey = pianoKeys.filter(k => k.keyCode === e.keyCode)[0];
		if (pianoKey !== undefined && this.state.isPressed.indexOf(e.keyCode) === -1) this.play(pianoKey);
	}
	
	handleKeyUp(e) {
		console.log('handleKeyUp');
		const pianoKey = pianoKeys.filter(k => k.keyCode === e.keyCode)[0];
		if (pianoKey !== undefined) {
			this.release(pianoKey);
			// this.setState({isPressed: []}, () => console.log(this.state.isPressed));
		}
	}
	
	play(pianoKey) {
		this.synth.triggerAttack(pianoKey.srcDescription);
		this.setState({isPressed: this.state.isPressed.concat(pianoKey.keyCode)});
	}
	
	release(pianoKey) {
		this.synth.triggerRelease(pianoKey.srcDescription);
		this.setState({isPressed: this.state.isPressed.filter(keyCode => keyCode !== pianoKey.keyCode)});
	}
	
	render() {
		const keys = pianoKeys.map(pianoKey => (
			<PianoKey
				key={pianoKey.label}
				isPressed={this.state.isPressed.indexOf(pianoKey.keyCode) > -1}
				isWhite={pianoKey.isWhite}
				onMouseDown={() => this.play(pianoKey)}
				onMouseUp={() => this.release(pianoKey)}
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