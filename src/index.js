import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Bar extends React.Component {
	constructor(props) {
		super(props);
		this.state={highlight:"none"};
	}
	render() {
		return (
			<div>Bruh</div>
		);
	}
}

var N;
const barContainer = document.getElementById("barContainer");

const barSlider = document.getElementById("barSlider")
barSlider.onchange = function() {
	N = barSlider.value;
	document.getElementById("numBarsDisplay").innerHTML = N;
	for (let i = 0; i < N; i++) {
		var bar = document.createElement("div");
		bar.innerHTML = i;
		bar.style.height = i*10 + "px";
		barContainer.appendChild(bar);
	}
}

//ReactDOM.render(<Bar val="1"  />, document.getElementById("barContainer"));