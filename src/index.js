import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Bar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div style={this.props.style}>{this.props.val}</div>
		);
	}
}

class BarContainer extends React.Component {
	renderBar(val,style) {
		return (
			<Bar val={val} style={style} />
		);
	}
	render() {
		const bars = this.props.barArray;
		const n = this.props.numBars;
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
	constructor(props) {
		super(props);
		this.state = {
			numBars: 10,
			barArray: [5,2,3,1,4,7,9,10,8,6],
		}
	}
	handleChange() {
		var n = document.getElementById("slider").value;
		document.getElementById("sliderValue").innerHTML = n;
		this.setState({
			numBars: n,
			barArray: this.makeArray(n),
		});
	}
	makeArray(n) {
		var ans = [];
		for (let i = 1; i <= n; i++) ans.push(i);
		return ans;
	}
	swap(i,j) {
		var arr = this.state.barArray.slice();
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		this.setState({
			barArray: arr,
		})
	}
	render() {
		const menuBar = (
			<ul id="menuBar">
				<li>Bubble Sort</li>
				<li>Selection Sort</li>
				<li>Insertion Sort</li>
				<li>Merge Sort</li>
				<li>Quick Sort</li>
				<button onClick={() => setTimeout(()=> this.swap(3,5), 1000)}>Swap</button>
				<label for="slider" id="sliderValue">10</label>
				<input type="range" min="5" max="25" defaultValue="10" name="slider" id="slider" onInput={() => this.handleChange()} />
			</ul>
		);
		const barContainer = (<BarContainer numBars={this.state.numBars} barArray={this.state.barArray} />);
		return (
			<div id="menuBarContainer">
				{menuBar}
				{barContainer}
			</div>
		);
	}
}

ReactDOM.render(<MenuBarContainer />, document.getElementById("root"));

//
