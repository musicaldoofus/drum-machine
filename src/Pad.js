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
		this.audio = document.getElementById(this.props.keyCode);
		this.audio.addEventListener('ended', () => this.setState({isActive: false}));
	}
	
	handlePadClick(keyCode) {
		this.audio.currentTime = 0;
		this.audio.play();
		this.props.onClick(keyCode);
		this.setState({isActive: true});
	}
		
	render() {
		let {onClick, keyCode, srcDescription, showLabel, label, oggSrc, mp3Src, wavSrc} = this.props;
		return (
			<div onClick={() => this.handlePadClick(keyCode)} className={`drum-pad ${this.state.isActive ? 'active' : ''}`} id={srcDescription} alt={srcDescription}>
				<audio className="clip" id={keyCode} preload="true" autoPlay={false}>
					{oggSrc ? <source src={oggSrc} type="audio/ogg"/> : null}
					{mp3Src ? <source src={mp3Src} type="audio/mpeg"/> : null}
					{wavSrc ? <source src={wavSrc} type="audio/wav"/> : null}
					Your browser does not support the <code>audio</code> tag.
				</audio>
				<div className="pad-display">
					{showLabel && label}
				</div>
			</div>
		);
	}
}

export default Pad;