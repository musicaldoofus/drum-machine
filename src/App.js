import React, { Component } from 'react';
import DrumPad from './DrumPad';
import Metronome from './Metronome';
import PianoPad from './PianoPad';
import logo from './media/img/drum-machine-avatar.png';
import hookup from './media/img/hookup.png';
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
							smooov
						</div>
						<div>
							<img src={logo} alt="Drum machine by Burns"/>
						</div>
					</div>
					<DrumPad
						volume={this.state.volume}
					/>
					<Metronome
						currentTempo={this.state.currentTempo}
						handleUpdateTempo={this.handleUpdateTempoBtn}
						onChange={this.handleUpdateTempoInput}
					/>
					<PianoPad
						volume={this.state.volume}
					/>
					<div className="hookup">
						<img src={hookup} alt=""/>
					</div>
				</div>
			</div>
		);
	}
}
export default App;