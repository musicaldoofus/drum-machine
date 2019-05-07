import React, { Component } from 'react';
import './Pad.css';

class Pad extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
		this.handlePadClick = this.handlePadClick.bind(this);
	}
	
	componentDidMount() {
		this.audio = document.getElementById(this.props.label); //improve
		this.audio.addEventListener('ended', () => this.setState({isActive: false}));
	}
	
	handlePadClick(keyCode) {
		this.props.onClick(keyCode);
		this.audio.currentTime = 0;
		this.setState({isActive: true});
	}
	
	render() {
		let {onClick, keyCode, srcDescription, showLabel, label, oggSrc, mp3Src, wavSrc} = this.props;
		const src = oggSrc || mp3Src || wavSrc;
		return (
			<div onClick={() => this.handlePadClick(keyCode)} className={`drum-pad ${this.state.isActive ? 'active' : ''}`} id={srcDescription} alt={srcDescription}>
				<audio className="clip" id={label} preload="true" autoPlay={false} src={src}>
					Your browser does not support the <code>audio</code> tag.
				</audio>
				<div className={`pad-display ${!showLabel ? 'hidden' : ''}`}>
					{label}
				</div>
			</div>
		);
	}
}

export default Pad;