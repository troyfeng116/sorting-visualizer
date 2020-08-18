import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const NORMAL = 0;
const ACTIVE = 1;
const COMPARE = 2;
const PIVOT = 3;

var speed = 100;
var stop = true;

class Bar extends React.Component {
	render() {
		return (
			<div style={this.props.style}>{this.props.val[0]}</div>
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
				width:90/n+"%",
				height:val[0]/n*100+"%",
				left:index*100/n+"%",
				backgroundColor:getColor(val[1])
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
	reset(i,j) {
		var arr = this.state.barArray.slice();
		arr[i][1] = NORMAL;
		arr[j][1] = NORMAL;
		this.setState({
			barArray: arr,
		});
	}
	swap(i,j) {
		var arr = this.state.barArray.slice();
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		arr[i][1] = COMPARE;
		arr[j][1] = COMPARE;
		this.setState({
			barArray: arr,
		});
		setTimeout(()=>this.reset(i,j),speed);
	}
	setColor(color) {
		var arr = this.state.barArray.slice();
		for (let i = 0; i < arr.length; i++) {
			arr[i][1] = color;
		}
		this.setState({
			barArray: arr,
		});
	}
	setActive(f,t) {
		var arr = this.state.barArray.slice();
		for (let k = 0; k < arr.length; k++) arr[k][1] = NORMAL;
		for (let k = f; k < t; k++) {
			arr[k][1] = ACTIVE;
		}
		arr[t][1] = PIVOT;
		this.setState({
			barArray:arr
		});
		//setTimeout(()=>this.setColor(NORMAL),speed*1.005);
	}
	shuffle() {
		stop = false;
		this.shuffleLoop(this.state.numBars-1);
	}
	shuffleLoop(i) {
		if (i < 1 || stop) return;
		var j = Math.floor(Math.random() * (i+1));
		this.swap(i,j);
		setTimeout(()=>this.shuffleLoop(i-1),speed);
	}
	bubbleSort() {
		var arr = this.state.barArray.slice();
		var sequence = [];
		for (let end = arr.length-1; end > 0; end--) {
			for (let i = 0; i < end; i++) {
				if (arr[i][0] > arr[i+1][0]) {
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
			while (j >= 0 && arr[j][0] > toMove[0]) {
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
			if (arr[i][0] < splitter[0]) {
				let temp = arr[i];
				arr[i] = arr[m];
				arr[m] = temp;
				if (i != m) sequence.push([i,m,l,r]);
				m++;
			}
		}
		arr[r] = arr[m];
		arr[m] = splitter;
		if (m != r) sequence.push([m,r,l,r]);
		this.qSortAux(arr,l,m-1,sequence);
		this.qSortAux(arr,m+1,r,sequence);
	}
	handleSequence(seq) {
		var numMoves = seq.length;
		stop = false;
		this.handleSequenceLoop(0,numMoves,seq);
	}
	handleSequenceLoop(cur,upTo,seq) {
		if (cur >= upTo || stop) return;
		if (seq[cur].length > 2) {
			this.setActive(seq[cur][2],seq[cur][3]);
		}
		this.swap(seq[cur][0], seq[cur][1]);
		setTimeout(()=>this.handleSequenceLoop(cur+1,upTo,seq), speed);
	}
	render() {
		const menuBar = (
			<ul id="menuBar">
				<li><button onClick={()=>this.bubbleSort()}>Bubble Sort</button></li>
				<li>Selection Sort</li>
				<li><button onClick={()=>this.insertionSort()}>Insertion Sort</button></li>
				<li>Merge Sort</li>
				<li><button onClick={()=>this.quickSort()}>Quick Sort</button></li>
				<li><button onClick={()=>this.shuffle()}>Shuffle</button></li>
				<label for="slider" id="sliderValue">25</label>
				<input type="range" min="5" max="50" defaultValue="25" name="slider" id="slider" onInput={() => this.handleChange()} />
				<li><button onClick={()=>{stop = true;}}>Stop</button></li>
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
	for (let i = 1; i <= n; i++) ans.push([i,NORMAL]);
	return ans;
}
function getColor(state) {
	return state==NORMAL?
		"darkblue" : state==ACTIVE?
			"purple" : state==COMPARE?
				"red" : "green";
}
function indexOf(arr, element) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][0] == element) return i;
	}
	return -1;
}

// ------------
ReactDOM.render(<MenuBarContainer />, document.getElementById("root"));
