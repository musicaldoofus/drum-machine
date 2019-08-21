import React, { Component } from 'react';
import DrumPad from './DrumPad';
import Metronome from './Metronome';
import PianoPad from './PianoPad';
import logo from './media/img/drum-machine-avatar.png';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentTempo: 120
		};
		this.handleUpdateTempoBtn = this.handleUpdateTempoBtn.bind(this);
		this.handleUpdateTempoInput = this.handleUpdateTempoInput.bind(this);
	}
	
	handleUpdateTempoBtn(increment) {
		this.setState({currentTempo: this.state.currentTempo + increment});
	}
	
	handleUpdateTempoInput(tempo) {
		console.log(tempo);
		this.setState({currentTempo: tempo});
	}
	
	render() {
		return (
			<div className="app">
				<div className="drum-machine">
					<div className="logo">
						<div>
							smoove
						</div>
						<div>
							<img src={logo} alt="Drum machine by Burns"/>
						</div>
					</div>
					<main role="main" id="drum-machine-container">
						<DrumPad/>
						<Metronome
							currentTempo={this.state.currentTempo}
							handleUpdateTempo={this.handleUpdateTempoBtn}
							onChange={this.handleUpdateTempoInput}
						/>
						<PianoPad/>
					</main>
				</div>
			</div>
		);
	}
}
export default App;