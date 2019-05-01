import React, { Component } from 'react';
import { Howl } from 'howler';
import audioSrc from './audioSrc';
import Pad from './Pad';
import QueuePad from './QueuePad';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			activePad: null,
			playQueue: [],
			playing: false,
			activeQueueIndex: 0,
			tempo: 120 //BPM
		};
		this.sounds = audioSrc.map(s => new Howl({src: [s.wavSrc]}));
		this.handlePadClick = this.handlePadClick.bind(this);
		this.handleAddSound = this.handleAddSound.bind(this);
		this.handlePlayQueue = this.handlePlayQueue.bind(this);
		this.handleUpdateTempo = this.handleUpdateTempo.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('keydown', (e) => {
			if (e.isComposing || e.keyCode === 229) return; //from MDN docs (avoid event during composition)
			this.handlePadKeyCodePress(e.keyCode);
		});
	}
	
	playSound(keyCode) {
		let ind = 0;
		for (let i = 0; i < this.sounds.length; i++) {
			if (audioSrc[i].keyCode === keyCode) ind = i;
		}
		this.sounds[ind].play();
	}
	
	handlePadKeyCodePress(keyCode) {
		this.playSound(keyCode);
	}
	
	OLD_handlePadKeyCodePress(keyCode) {
		const audioKeyCode = audioSrc.filter(s => s.keyCode === keyCode);
		if (audioKeyCode.length === 0) return;
		document.getElementById(audioKeyCode[0].srcDescription).click();
	}
	
	handlePadClick(keyCode) {
		this.setState({activePad: keyCode});
		!this.state.playing ? this.handleAddSound(keyCode) : console.log('playing');
	}
	
	handleAddSound(keyCode) {
		if (this.state.playQueue.length >= 8) return;
		const currQueue = this.state.playQueue.slice();
		const playQueue = currQueue.concat(keyCode);
		this.setState({playQueue});
	}
	
	handlePlayQueue() {
		this.setState({playing: true});
		const tempoMilliseconds = (1/(this.state.tempo/60)) * 1000; //convert from BPM to milliseconds
		const that = this;
		const playFromQueue = () => {
			this.playSound(this.state.playQueue[this.state.activeQueueIndex]);
			if (this.state.activeQueueIndex < (this.state.playQueue.length - 1)) {
				that.setState({activeQueueIndex: that.state.activeQueueIndex + 1});
			}
			else {
				window.clearInterval(queueSounds);
				this.setState({playing: false, activeQueueIndex: 0});
			}
		};
		const queueSounds = window.setInterval(playFromQueue, tempoMilliseconds);
	}
	
	handleUpdateTempo(a) {
		const tempo = this.state.tempo + a;
		this.setState({tempo});
	}
	
	render() {
		const pads = audioSrc.map(s => (
			<Pad
				key={s.label}
				onClick={this.handlePadClick}
				{...s}
			/>
		));
		const queue = this.state.playQueue.map((k, i) => <QueuePad key={i} keyCode={k}/>);
		return (
			<div className="app-wrapper">
				<div id="drum-machine" className="drum-machine">
					<div id="display" className="display">
						<div>
							<p>{this.state.activePad ? audioSrc.filter(s => s.keyCode === this.state.activePad)[0].srcDescription : null}</p>
						</div>
						<div className="tempo-wrapper">
							<button className="tempo-btn" onClick={() => this.handleUpdateTempo(5)}>+</button>
							<button className="tempo-btn" onClick={() => this.handleUpdateTempo(-5)}>-</button>
							<p>{this.state.tempo}</p>
						</div>
					</div>
					<div className="pad-wrapper">
						{pads}
					</div>
				</div>
				<div className="queue-wrapper">
					<button onClick={this.handlePlayQueue}>Play</button>
					{queue}
				</div>
			</div>
		);
	}
}

export default App;