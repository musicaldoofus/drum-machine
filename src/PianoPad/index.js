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
		this.getPianoKey = this.getPianoKey.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.play = this.play.bind(this);
		this.release = this.release.bind(this);
		this.containerRef = React.createRef();
	}
	
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);
	}
	
	getPianoKey(e) {
		// console.log('checking event', e);
		let keyCode = e.keyCode === 186 ? 59 : e.keyCode;
		return pianoKeys.filter(k => k.keyCode === keyCode)[0];
	}
	
	handleKeyDown(e) {
		if (e.isComposing || e.keyCode === 229) return //per MDN
		e.preventDefault();
		const pianoKey = this.getPianoKey(e);
		if (pianoKey !== undefined && this.state.isPressed.indexOf(pianoKey.keyCode) === -1) this.play(pianoKey);
	}
	
	handleKeyUp(e) {
		// console.log('handleKeyUp');
		const pianoKey = this.getPianoKey(e);
		if (pianoKey !== undefined) this.release(pianoKey, true);
	}
	
	handleMouseDown(pianoKey) {
		// e.preventDefault();
		this.play(pianoKey);
	}
	
	handleMouseUp(e) {
		// console.log(e);
		if (e) e.preventDefault();
		// console.log('handleMouseUp');
		// const pianoKey = this.getPianoKey(e);
		this.release(null, true);
	}
	
	play(pianoKey) {
		this.synth.triggerAttack(pianoKey.srcDescription);
		this.setState({isPressed: this.state.isPressed.concat(pianoKey.keyCode)});
	}
	
	release(pianoKey) {
		// console.log('release');
		if (pianoKey) {
			this.synth.triggerRelease(pianoKey.srcDescription);
			this.setState({isPressed: this.state.isPressed.filter(keyCode => keyCode !== pianoKey.keyCode)});
		}
		else {
			pianoKeys.forEach(pianoKey => this.synth.triggerRelease(pianoKey.srcDescription));
			this.setState({isPressed: []});
		}
	}
	
	render() {
		const keys = pianoKeys.map(pianoKey => (
			<PianoKey
				key={pianoKey.label}
				isPressed={this.state.isPressed.indexOf(pianoKey.keyCode) > -1}
				isWhite={pianoKey.isWhite}
				onMouseDown={() => this.handleMouseDown(pianoKey)}
				onMouseUp={this.handleMouseUp}
			/>
		));
		return (
			<div className="piano-pad-container" ref={this.containerRef}>
				{keys}
			</div>
		);
	}
}

export default PianoPad;