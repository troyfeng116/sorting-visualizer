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
			barArray: makeArray(10),
		}
	}
	handleChange() {
		var n = document.getElementById("slider").value;
		document.getElementById("sliderValue").innerHTML = n;
		this.setState({
			numBars: n,
			barArray: makeArray(n),
		});
	}
	swap(i,j) {
		var arr = this.state.barArray.slice();
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		this.setState({
			barArray: arr,
		});
	}
	shuffle() {
		this.myShuffleLoop(this.state.numBars-1);
	}
	myShuffleLoop(i) {
		if (i < 1) return;
		var j = Math.floor(Math.random() * (i+1));
		this.swap(i,j);
		setTimeout(()=>this.myShuffleLoop(i-1),100);
	}
	bubbleSort() {
		var arr = this.state.barArray.slice();
		var sequence = [];
		for (let end = arr.length-1; end > 0; end--) {
			for (let i = 0; i < end; i++) {
				if (arr[i] > arr[i+1]) {
					var temp = arr[i];
					arr[i] = arr[i+1];
					arr[i+1] = temp;
					sequence.push([i,i+1]);
				}
			}
		}
		this.handleSequence(sequence);
	}
	handleSequence(seq) {
		var numMoves = seq.length;
		this.handleSequenceLoop(0,numMoves,seq);
	}
	handleSequenceLoop(cur,upTo,seq) {
		if (cur >= upTo) return;
		this.swap(seq[cur][0], seq[cur][1]);
		setTimeout(()=>this.handleSequenceLoop(cur+1,upTo,seq), 100);
	}
	render() {
		const menuBar = (
			<ul id="menuBar">
				<li><button onClick={()=>this.bubbleSort()}>Bubble Sort</button></li>
				<li>Selection Sort</li>
				<li>Insertion Sort</li>
				<li>Merge Sort</li>
				<li>Quick Sort</li>
				<li><button onClick={() => this.shuffle()}>Shuffle</button></li>
				<label for="slider" id="sliderValue">10</label>
				<input type="range" min="5" max="25" defaultValue="10" name="slider" id="slider" onInput={() => this.handleChange()} />
			</ul>
		);
		const barContainer = (<BarContainer numBars={this.state.numBars} barArray={this.state.barArray} />);
		return (
			<div id="menuBarContainer">
				{menuBar}
				{barContainer}
				<div id="test">TEST</div>
			</div>
		);
	}
}

function makeArray(n) {
	var ans = [];
	for (let i = 1; i <= n; i++) ans.push(i);
	return ans;
}

// ------------
ReactDOM.render(<MenuBarContainer />, document.getElementById("root"));
