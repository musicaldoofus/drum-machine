import React/*, { Component }*/ from 'react';
import DrumPad from './DrumPad';
import PianoPad from './PianoPad';
import './App.css';

const App = () => (
	<div className="app">
		<DrumPad/>
		<PianoPad/>
	</div>
);

export default App;