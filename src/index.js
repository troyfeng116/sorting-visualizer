import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const NORMAL = 0;
const ACTIVE = 1;
const COMPARE = 2;
const PIVOT = 3;
const SORTED = 4;

var speed = 100;
var active = false;

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
				width:85/n+"%",
				height:val[0]/n*100+"%",
				left:index*100/n+"%",
				backgroundColor:getColor(val[1])
			};
      		return n <= 40? this.renderBar(val[0],barStyle) : this.renderBar("",barStyle);
    	});
		return (
			<div id="barContainer">
				{moves}
			</div>
		);
	}
}

class BigContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numBars: 30,
			barArray: makeArray(30),
		}
	}
	handleNumBarsChange() {
		var n = document.getElementById("barSlider").value;
		document.getElementById("barSliderDisplay").innerHTML = "# BARS: "+n;
		this.setState({
			numBars: n,
			barArray: makeArray(n),
		});
	}
	handleSpeedChange() {
		speed = document.getElementById("speedSlider").value;
		document.getElementById("speedSliderDisplay").innerHTML = "SPEED: "+(speed/1000)+"s";
	}
	handleStop() {
		active = false;
		this.setColor(NORMAL);
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
	setActive(f,t,quickSort) {
		var arr = this.state.barArray.slice();
		for (let k = 0; k < arr.length; k++) arr[k][1] = NORMAL;
		for (let k = f; k <= t; k++) {
			arr[k][1] = ACTIVE;
		}
		if (quickSort) arr[t][1] = PIVOT;
		this.setState({
			barArray:arr
		});
	}
	shuffle() {
		if (active) return;
		this.setColor(NORMAL);
		active = true;
		this.shuffleLoop(this.state.numBars-1);
	}
	shuffleLoop(i) {
		if (!active) return;
		if (i < 1) {
			active = false;
			return;
		}
		var j = Math.floor(Math.random() * (i+1));
		this.swap(i,j);
		setTimeout(()=>this.shuffleLoop(i-1),speed);
	}
	bubbleSort() {
		if (active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handleSequence(bSort(arr));
	}
	insertionSort() {
		if (active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handleSequence(iSort(arr));
	}
	quickSort() {
		if (active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handleSequence(qSort(arr));
	}
	mergeSort() {
		if (active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		var sequence = [];
		this.mSortAux(arr,0,arr.length-1,sequence);
		this.handleSequence(sequence);
	}
	mSortAux(arr,l,r,sequence) {
		if (l >= r) return;
		var m = Math.floor((l+r)/2);
		this.mSortAux(arr,l,m,sequence);
		this.mSortAux(arr,m+1,r,sequence);
		this.merge(arr,l,r,sequence);
	}
	merge(arr,l,r,sequence) {
		var m = Math.floor((l+r)/2);
		var lIndex = l;
		var rIndex = m+1;
		while (lIndex <= m && rIndex <= r) {
			if (arr[lIndex][0] <= arr[rIndex][0]) {
				lIndex++;
				sequence.push([arr.slice(),l,r,lIndex,rIndex]);
			}
			else {
				var temp = arr[rIndex];
				var i = rIndex;
				while (i !== lIndex) {
					arr[i] = arr[i-1];
					i--;
				}
				arr[lIndex] = temp;
				sequence.push([arr.slice(),l,r,lIndex,rIndex]);
				lIndex++;
				rIndex++;
				m++;
			}
		}
	}
	handleSequence(seq) {
		var numMoves = seq.length;
		active = true;
		this.handleSequenceLoop(0,numMoves,seq);
	}
	handleSequenceLoop(cur,upTo,seq) {
		if (!active) return;
		if (cur >= upTo) {
			active = false;
			return;
		}
		if (seq[cur].length === 2 || seq[cur].length === 4) {
			if (seq[cur].length === 4) this.setActive(seq[cur][2],seq[cur][3], true);
			this.swap(seq[cur][0], seq[cur][1]);
		}
		else if (seq[cur].length === 5) {
			this.setActive(seq[cur][1], seq[cur][2], false);
			var newArr = seq[cur][0];
			newArr[seq[cur][3]][1] = COMPARE;
			newArr[seq[cur][4]][1] = COMPARE;
			this.setState({
				barArray: newArr,
			});
		}
		setTimeout(()=>this.handleSequenceLoop(cur+1,upTo,seq), speed);
		if (sorted(this.state.barArray)) {
			setTimeout(()=>this.setColor(SORTED),speed);
		}
	}
	render() {
		const menuBar = (
			<ul id="menuBar">
				<li><button onClick={()=>this.bubbleSort()}>Bubble Sort</button></li>
				<li>Selection Sort</li>
				<li><button onClick={()=>this.insertionSort()}>Insertion Sort</button></li>
				<li><button onClick={()=>this.mergeSort()}>Merge Sort</button></li>
				<li><button onClick={()=>this.quickSort()}>Quick Sort</button></li>
				<li><button onClick={()=>this.shuffle()}>Shuffle</button></li>
				<li><button onClick={()=>this.handleStop()}>Stop</button></li>
			</ul>
		);
		const sliderContainer = (
			<div id="sliderContainer">
				<input 
					type="range" 
					min="5" max="75" defaultValue="30" 
					name="barSlider" id="barSlider" 
					onInput={() => this.handleNumBarsChange()} /><br/>
				<label for="barSlider" id="barSliderDisplay"># BARS: 30</label><br/><br/>
				<input 
					type="range" 
					min="10" max="700" defaultValue="100"  step="10"
					name="speedSlider" id="speedSlider" onInput={() => this.handleSpeedChange()} /><br/>
				<label for="speedSlider" id="speedSliderDisplay">SPEED: 0.1 s</label><br/>
			</div>
		)
		const barContainer = (<BarContainer numBars={this.state.numBars} barArray={this.state.barArray} />);
		return (
			<div id="menuBarContainer">
				{menuBar}
				{sliderContainer}
				{barContainer}
				<div id="test">TEST</div>
			</div>
		);
	}
}

/* -------- SORTING ALGORITHMS -------- */
function bSort(arr) {
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
	return sequence;
}
function iSort(arr) {
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
	return sequence;
}
function qSort(arr) {
	var sequence = [];
	qSortAux(arr,0,arr.length-1,sequence);
	return sequence;
}
function qSortAux(arr, l, r, sequence) {
	if (l >= r) return;
	var splitter = arr[r];
	var m = l;
	for (let i = l; i < r; i++) {
		if (arr[i][0] < splitter[0]) {
			let temp = arr[i];
			arr[i] = arr[m];
			arr[m] = temp;
			if (i !== m) sequence.push([i,m,l,r]);
			m++;
		}
	}
	arr[r] = arr[m];
	arr[m] = splitter;
	if (m !== r) sequence.push([m,r,l,r]);
	qSortAux(arr,l,m-1,sequence);
	qSortAux(arr,m+1,r,sequence);
}

/* -------- UTILITY FUNCTIONS -------- */
function makeArray(n) {
	var ans = [];
	for (let i = 1; i <= n; i++) ans.push([i,NORMAL]);
	return ans;
}
function getColor(state) {
	return state===NORMAL?
		"rgb(60,60,120)" : state===ACTIVE?
			"rgb(100,100,255)" : state===COMPARE?
				"red" : state===PIVOT?
					"blue" : "rgb(80,210,80)";
}
function sorted(arr) {
	for (let i = 0; i < arr.length-1; i++) {
		if (arr[i][0] > arr[i+1][0]) return false;
	}
	return true;
}

/* -------- RENDER -------- */
ReactDOM.render(<BigContainer />, document.getElementById("root"));