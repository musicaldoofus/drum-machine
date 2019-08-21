import React, { Component, Fragment } from 'react';
import uiInstructionsDrum from '../media/img/ui-instructions-drum.png';
import uiInstructionsPiano from '../media/img/ui-instructions-piano.png';
import './Instructions.css';

class Instructions extends Component {
	constructor() {
		super();
		this.state = {
			expanded: null
		};
		this.handleToggleExpand = this.handleToggleExpand.bind(this);
		this.handleWindowResize = this.handleWindowResize.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
	}
	
	handleToggleExpand(type) {
		console.log(type);
		if (this.state.expanded === type) type = null;
		this.setState({expanded: type});
	}
	
	handleWindowResize() {
		this.setState({expanded: null});
	}
	
	render() {
		return (
			<Fragment>
				<div className={`ui-instructions drum${this.state.expanded === 'drum' ? ' active' : ''}`} onClick={() => this.handleToggleExpand('drum')}>
					<img src={uiInstructionsDrum} alt="See which keys to use to play drum beats"/>
				</div>
				<div className={`ui-instructions piano${this.state.expanded === 'piano' ? ' active' : ''}`} onClick={() => this.handleToggleExpand('piano')}>
					<img src={uiInstructionsPiano} alt="See which keys to use to play notes on the piano"/>
				</div>
			</Fragment>
		);
	}
}

export default Instructions;