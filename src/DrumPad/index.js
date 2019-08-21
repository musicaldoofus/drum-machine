import React, { Component } from 'react';
import drumPadsWithHowler from '../helpers/drumPads';
import './DrumPad.css';

const Pad = (props) => {
	return (
		<div
			onClick={props.onClick}
			className={`drum-pad${props.isActive ? ' active' : ''}`}
		></div>
	);
}

class DrumPad extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPressed: []
		};
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.playPad = this.playPad.bind(this);
		this.handlePadRelease = this.handlePadRelease.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}
	
	handleKeyDown(e) {
		e.preventDefault();
		const pad = drumPadsWithHowler.filter(pad => pad.keyCode === e.keyCode)[0];
		if (pad !== undefined && this.state.isPressed.indexOf(pad.keyCode) === -1) this.playPad(pad);
	}
	
	playPad(pad) {
		pad.howl.play();
		this.setState({isPressed: this.state.isPressed.concat(pad.keyCode)}, () => this.handlePadRelease(pad.keyCode));
	}
	
	handlePadRelease(keyCode) {
		window.setTimeout(() => this.setState({
			isPressed: this.state.isPressed.filter(code => code !== keyCode)
		}), 100);
	}
	
	render() {
		const pads = drumPadsWithHowler.map(pad => (
			<Pad
				key={pad.keyCode}
				onClick={() => this.playPad(pad)}
				{...pad}
			/>
		));
		return (
			<div className="drum-pad-container">
				{pads}
			</div>
		);
	}
}

export default DrumPad;