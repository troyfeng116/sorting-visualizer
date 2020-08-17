import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const NORMAL = 0;
const ACTIVE = 1;
const COMPARE = 2;

class Bar extends React.Component {
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
			numBars: 25,
			barArray: makeArray(25),
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
		this.shuffleLoop(this.state.numBars-1);
	}
	shuffleLoop(i) {
		if (i < 1) return;
		var j = Math.floor(Math.random() * (i+1));
		this.swap(i,j);
		setTimeout(()=>this.shuffleLoop(i-1),50);
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
	insertionSort() {
		var arr = this.state.barArray.slice();
		var sequence = [];
		for (let i = 0; i < arr.length; i++) {
			var toMove = arr[i];
			let j = i-1;
			while (j >= 0 && arr[j] > toMove) {
				arr[j+1] = arr[j];
				arr[j] = toMove;
				sequence.push([j,j+1]);
				j--;
			}
		}
		this.handleSequence(sequence);
	}
	quickSort() {
		var arr = this.state.barArray.slice();
		var sequence = [];
		this.qSortAux(arr, 0, arr.length-1, sequence);
		this.handleSequence(sequence);
	}
	qSortAux(arr, l, r, sequence) {
		if (l >= r) return;
		var splitter = arr[r];
		var m = l;
		for (let i = l; i < r; i++) {
			if (arr[i] < splitter) {
				var temp = arr[i];
				arr[i] = arr[m];
				arr[m] = temp;
				if (i !== m) sequence.push([i,m]);
				m++;
			}
		}
		arr[r] = arr[m];
		arr[m] = splitter;
		if (m !== r) sequence.push([m,r]);
		this.qSortAux(arr,l,m-1,sequence);
		this.qSortAux(arr,m+1,r,sequence);
	}
	handleSequence(seq) {
		var numMoves = seq.length;
		this.handleSequenceLoop(0,numMoves,seq);
	}
	handleSequenceLoop(cur,upTo,seq) {
		if (cur >= upTo) return;
		this.swap(seq[cur][0], seq[cur][1]);
		setTimeout(()=>this.handleSequenceLoop(cur+1,upTo,seq), 70);
	}
	render() {
		const menuBar = (
			<ul id="menuBar">
				<li><button onClick={()=>this.bubbleSort()}>Bubble Sort</button></li>
				<li>Selection Sort</li>
				<li><button onClick={()=>this.insertionSort()}>Insertion Sort</button></li>
				<li>Merge Sort</li>
				<li><button onClick={()=>this.quickSort()}>Quick Sort</button></li>
				<li><button onClick={() => this.shuffle()}>Shuffle</button></li>
				<label for="slider" id="sliderValue">25</label>
				<input type="range" min="5" max="50" defaultValue="25" name="slider" id="slider" onInput={() => this.handleChange()} />
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
