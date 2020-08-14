import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Bar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={this.props.style}>DIV {this.props.val}</div>
		);
	}
}

class BarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			numBars: 10,
			barArray: [1,2,3,4,5,6,7,9,10,8],
		};
	}
	renderBar(val,style) {
		return (
			<Bar val={val} style={style} />
		);
	}

	render() {
		const bars = this.state.barArray;
		const n = bars.length;
		const moves = bars.map((val,index) => {
			const barStyle = {
				width:100/n+"%",
				height:val/n*100+"%",
				left:index*100/n+"%",
			};
      		return this.renderBar(val,barStyle);
    	});

		return (
			<div id="barContainer">
				{moves}
			</div>
		);
	}
}

class MenuBarContainer extends React.Component {
	handleChange() {
		document.getElementById("sliderValue").innerHTML = document.getElementById("slider").value;
	}
	render() {
		const menuBar = (
			<ul id="menuBar">
				<li>Bubble Sort</li>
				<li>Selection Sort</li>
				<li>Insertion Sort</li>
				<li>Merge Sort</li>
				<li>Quick Sort</li>
				<label for="slider" id="sliderValue">10</label>
				<input type="range" min="5" max="25" defaultValue="10" name="slider" id="slider" onInput={() => this.handleChange()}></input>
			</ul>
		);
		return (
			<div id="menuBarContainer">
				{menuBar}
			</div>
		);
	}
}

class Package extends React.Component {
	render() {
		return (
			<div>
				<MenuBarContainer />
				<BarContainer />
			</div>
		);
	}
}

ReactDOM.render(<Package />, document.getElementById("root"));
