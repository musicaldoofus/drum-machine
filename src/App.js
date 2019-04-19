import React, { Component } from 'react';
import audioSrc from './audioSrc';
import Pad from './Pad';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			activePad: null
		};
		this.handlePadClick = this.handlePadClick.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('keydown', (e) => {
			if (e.isComposing || e.keyCode === 229) return; //from MDN docs (avoid event during composition)
			this.handlePadKeyCodePress(e.keyCode);
		});
	}
	
	handlePadKeyCodePress(keyCode) {
		const audio = document.getElementById(keyCode);
		if (!audio) return;
		audio.currentTime = 0;
		audio.play();
		this.handlePadClick(keyCode);
	}
	
	handlePadClick(keyCode) {
		this.setState({activePad: keyCode});
	}
	
	render() {
		const pads = audioSrc.map(s => <Pad key={s.label} onClick={this.handlePadClick} {...s}/>);
		return (
			<div id="drum-machine">
				<div id="display" className="display">
					{this.state.activePad ? audioSrc.filter(s => s.keyCode === this.state.activePad)[0].srcDescription : null}
				</div>
				<div className="pad-wrapper">
					{pads}
				</div>
			</div>
		);
	}
}

export default App;
