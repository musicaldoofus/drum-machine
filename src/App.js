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
			playQueue: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			queueFocus: null,
			playing: false,
			queueRepeat: false,
			activeQueueIndex: 0,
			tempo: 120 //BPM
		};
		const soundKeys = audioSrc.map(s => ''.concat(s.keyCode));
		this.sounds = {};
		soundKeys.forEach((k, i) => this.sounds[k] = new Howl({src: [audioSrc[i].wavSrc]}));
		this.handlePadClick = this.handlePadClick.bind(this);
		this.handlePlayQueue = this.handlePlayQueue.bind(this);
		this.handleUpdateTempo = this.handleUpdateTempo.bind(this);
		this.handleQueueRepeat = this.handleQueueRepeat.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('keydown', (e) => {
			if (e.isComposing || e.keyCode === 229) return; //from MDN docs (avoid event during composition)
			this.handlePadClick(e.keyCode);
		});
	}
	
	playSound(keyCode) {
		if (this.sounds.hasOwnProperty(keyCode)) this.sounds[keyCode].play();
	}
	
	handlePadClick(keyCode) {
		this.playSound(keyCode);
		if (this.state.queueFocus || this.state.queueFocus === 0) {
			this.addToQueue(keyCode);
		}
	}
	
	handleQueuePadClick(ind) {
		this.setState({queueFocus: ind}, () => console.log(ind));
	}
	
	addToQueue(keyCode) {
		const currQueue = JSON.parse(JSON.stringify(this.state.playQueue));
		const updatedBeat = currQueue[this.state.queueFocus].concat(keyCode);
		let updatedQueue = currQueue;
		updatedQueue[this.state.queueFocus] = updatedBeat;
		this.setState({playQueue: updatedQueue, queueFocus: null}, () => console.log('updated queue', this.state.playQueue));
	}
	
	handlePlayQueue() {
		this.setState({playing: true});
		const tempoMilliseconds = (1/(this.state.tempo/60)) * 1000; //convert from BPM to milliseconds
		const that = this;
		const playFromQueue = () => {
			this.playSoundsAtInd(this.state.activeQueueIndex);
			if (this.state.activeQueueIndex < (this.state.playQueue.length - 1)) {
				that.setState({activeQueueIndex: that.state.activeQueueIndex + 1});
			}
			else {
				if (this.state.queueRepeat) {
					this.setState({activeQueueIndex: 0});
				}
				else {
					window.clearInterval(queueSounds);
					this.setState({playing: false, activeQueueIndex: 0});
				}
			}
		};
		const queueSounds = window.setInterval(playFromQueue, tempoMilliseconds);
	}
	
	playSoundsAtInd(ind) {
		this.state.playQueue[ind].forEach(s => this.playSound(s));
	}
	
	handleUpdateTempo(a) {
		const tempo = this.state.tempo + a;
		this.setState({tempo});
	}
	
	handleQueueRepeat() {
		this.setState({queueRepeat: !this.state.queueRepeat});
	}
	
	render() {
		const pads = audioSrc.map(s => (
			<Pad
				key={s.label}
				onClick={this.handlePadClick}
				{...s}
			/>
		));
		const queuePads = this.state.playQueue
			.map((sArr, ind) => <QueuePad key={ind} onClick={() => this.handleQueuePadClick(ind)} isActive={sArr.length > 0}/>);
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
				<div className="queue-btn-wrapper">
					<button onClick={this.handlePlayQueue}>Play</button>
					<button onClick={this.handleQueueRepeat}>Repeat</button>
				</div>
				<div className="queue-wrapper">
					{queuePads}
				</div>
			</div>
		);
	}
}

export default App;