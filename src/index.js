import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* -------- CONSTANTS -------- */
const NORMAL = 0;
const ACTIVE = 1;
const COMPARE = 2;
const PIVOT = 3;
const SORTED = 4;
const delay = 100;

/* -------- GLOBAL STATES -------- */
var speed = 100;

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
				width:55/n+"%",
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
			active: false,
		}
	}
	handleNumBarsChange() {
		var n = document.getElementById("barSlider").value;
		document.getElementById("barSliderDisplay").innerHTML = "# BARS: "+n;
		this.setState({
			numBars: n,
			barArray: makeArray(n),
			active: false,
		});
	}
	handleSpeedChange() {
		speed = document.getElementById("speedSlider").value;
		document.getElementById("speedSliderDisplay").innerHTML = "SPEED: "+(speed/1000)+"s";
	}
	handleStop() {
		this.setState({
			active: false,
		});
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
	shuffle(instant) {
		if (this.state.active) return;
		this.setColor(NORMAL);
		if (instant) {
			var arr = this.state.barArray.slice();
			for (let i = this.state.numBars-1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i+1));
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
			this.setState({
				barArray: arr,
			});
			return;
		}
		this.setState({
			active: true,
		});
		setTimeout(()=>this.shuffleLoop(this.state.numBars-1), delay);
	}
	shuffleLoop(i) {
		if (this.state.active === false) return;
		if (i < 1) {
			this.setState({active: false});
			return;
		}
		var j = Math.floor(Math.random() * (i+1));
		this.swap(i,j);
		setTimeout(()=>this.shuffleLoop(i-1),speed);
	}
	bubbleSort() {
		if (this.state.active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handleSequence(bSort(arr));
	}
	insertionSort() {
		if (this.state.active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handleSequence(iSort(arr));
	}
	heapSort() {
		if (this.state.active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handeSequence(hSort(arr));
	}
	quickSort() {
		if (this.state.active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handleSequence(qSort(arr));
	}
	mergeSort() {
		if (this.state.active) return;
		var arr = this.state.barArray.slice();
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handleSequence(mSort(arr));
	}
	handleSequence(seq) {
		var numMoves = seq.length;
		this.setState({active: true});
		setTimeout(()=>this.handleSequenceLoop(0,numMoves,seq),delay);
	}
	handleSequenceLoop(cur,upTo,seq) {
		if (!this.state.active) return;
		if (cur >= upTo) {
			this.setState({active: false});
			if (sorted(this.state.barArray)) setTimeout(()=>this.setColor(SORTED), speed);
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
	}
	render() {
		const menuBar = (
			<ul id="menuBar">
				<li><div onClick={()=>this.bubbleSort()}>Bubble Sort</div></li>
				<li><div onClick={()=>this.insertionSort()}>Insertion Sort</div></li>
				<li><div onClick={()=>this.heapSort()}>Heap Sort</div></li>
				<li><div onClick={()=>this.quickSort()}>Quick Sort</div></li>
				<li><div onClick={()=>this.mergeSort()}>Merge Sort</div></li>
			</ul>
		);
		const otherButtons = (
			<div id="otherButtonsContainer">
				<div onClick={()=>this.shuffle(false)}>Shuffle</div><br/>
				<div onClick={()=>this.shuffle(true)}>Instant Shuffle</div><br/>
				<div onClick={()=>this.handleStop()}>Stop</div>
			</div>
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
					min="10" max="700" defaultValue="100" step="10"
					name="speedSlider" id="speedSlider" onInput={() => this.handleSpeedChange()} /><br/>
				<label for="speedSlider" id="speedSliderDisplay">SPEED: 0.1 s</label><br/>
			</div>
		);
		const barContainer = (<BarContainer numBars={this.state.numBars} barArray={this.state.barArray} />);
		return (
			<div id="menuBarContainer">
				{menuBar}
				{otherButtons}
				{sliderContainer}
				{barContainer}
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
function hSort(arr) {
	var sequence = [];
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
function mSort(arr) {
	var sequence = [];
	mSortAux(arr,0,arr.length-1,sequence);
	return sequence;
}
function mSortAux(arr,l,r,sequence) {
	if (l >= r) return;
	var m = Math.floor((l+r)/2);
	mSortAux(arr,l,m,sequence);
	mSortAux(arr,m+1,r,sequence);
	merge(arr,l,r,sequence);
}
function merge(arr,l,r,sequence) {
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
			lIndex++;
			m++;
			rIndex++;
			if (rIndex < arr.length) sequence.push([arr.slice(),l,r,lIndex,rIndex]);
			else sequence.push([arr.slice(),l,r,lIndex,rIndex-1]);
		}
	}
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
