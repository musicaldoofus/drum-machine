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
		const audioKeyCode = audioSrc.filter(s => s.keyCode === keyCode);
		if (audioKeyCode.length === 0) return;
		document.getElementById(audioKeyCode[0].srcDescription).click();
	}
	
	handlePadClick(keyCode) {
		this.setState({activePad: keyCode});
	}
	
	render() {
		const pads = audioSrc.map(s => (
			<Pad
				key={s.label}
				onClick={this.handlePadClick}
				{...s}
			/>
		
		));
		return (
			<div id="drum-machine" className="drum-machine">
				<div id="display" className="display">
					<div>
						<p>{this.state.activePad ? audioSrc.filter(s => s.keyCode === this.state.activePad)[0].srcDescription : null}</p>
					</div>
				</div>
				<div className="pad-wrapper">
					{pads}
				</div>
			</div>
		);
	}
}

export default App;