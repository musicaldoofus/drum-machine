import React, { Component } from 'react';
import Howler from 'howler';
import pianoWithHowl from '../helpers/audioSrc';
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
			isPressedLabel: null
		};
		this.play = this.play.bind(this);
		this.stop = this.stop.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('keydown', (e) => {
			if (e.isComposing || e.keyCode === 229) return; //from MDN docs (avoid event during composition)
			e.preventDefault();
			this.handleKeyDown(e.keyCode);
		});
		window.addEventListener('keyup', (e) => this.handleKeyUp(e.keyCode));
	}
	
	handleKeyDown(keyCode) {
		const sound = pianoWithHowl.filter(s => s.keyCode === keyCode)[0];
		if (sound !== undefined) this.play(sound);
	}
	
	handleKeyUp(keyCode) {
		const sound = pianoWithHowl.filter(s => s.keyCode === keyCode)[0];
		if (sound !== undefined) this.stop(sound);
	}
	
	play(s) {
		s.howl.play();
		this.setState({
			isPressedLabel: s.label
		});
	}
	
	stop(s) {
		s.howl.fade(1.0, 0.0, 100);
		this.setState({
			isPressedLabel: null
		});
	}
	
	render() {
		const pianoKeys = pianoWithHowl.map(s => (
			<PianoKey
				isPressed={this.state.isPressedLabel === s.label}
				{...s}
				key={s.label}
				onMouseDown={() => this.play(s)}
				onMouseUp={() => this.stop(s)}
			/>
		));
		return (
			<div className="piano-pad-container">
				{pianoKeys}
			</div>
		);
	}
}

export default PianoPad;