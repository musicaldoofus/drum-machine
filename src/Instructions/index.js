import React, { Component, Fragment } from 'react';
import uiInstructionsDrum from '../media/img/ui-instructions-drum.png';
import uiInstructionsPiano from '../media/img/ui-instructions-piano.png';
import './Instructions.css';

class Instructions extends Component {
	constructor() {
		super();
		this.state = {
			isDrumExpanded: false,
			isPianoExpanded: false
		};
		this.handleToggleExpand = this.handleToggleExpand.bind(this);
	}
	
	handleToggleExpand(type) {
		this.setState({[type]: !this.state[type]});
	}
	
	render() {
		return (
			<Fragment>
				<div className={`ui-instructions drum${this.state.isDrumExpanded ? ' active' : ''}`} onClick={() => this.handleToggleExpand('isDrumExpanded')}>
					<img src={uiInstructionsDrum} alt="See which keys to use to play drum beats"/>
				</div>
				<div className={`ui-instructions piano${this.state.isPianoExpanded ? ' active' : ''}`} onClick={() => this.handleToggleExpand('isPianoExpanded')}>
					<img src={uiInstructionsPiano} alt="See which keys to use to play notes on the piano"/>
				</div>
			</Fragment>
		);
	}
}

export default Instructions;