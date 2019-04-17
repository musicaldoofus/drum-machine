import React, { Component } from 'react';
import audioSrc from './audioSrc';
import Pad from './Pad';
import './App.css';

//Todo:
//handle audio src={null}
//pre-load audio files to avoid latency?
//consider loading audio locally instead

class App extends Component {
	constructor() {
		super();
		this.state = {
			activePad: null
		};
		this.handlePadEvent = this.handlePadEvent.bind(this);
	}
	
	handlePadEvent(e) { //must be attached via key and mouse click to Pad
		//set 'active' pad using setState
	}
	
	render() {
		const pads = audioSrc.map(s => <Pad {...s} onClick={this.handlePadEvent}/>);
		return (
			<div id="drum-machine">
				{pads}
				<div id="display" className="display">
					{this.state.activePad ? audioSrc.filter(s => s.label === this.state.activePad)[0].srcDescription : null}
				</div>
			</div>
		);
	}
}

export default App;
