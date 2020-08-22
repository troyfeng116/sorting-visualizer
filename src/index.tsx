import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* -------- ALGORITHMS -------- */
import { mSort } from './algorithms/mergeSort';
import { qSort } from './algorithms/quickSort';
import { bSort } from './algorithms/bubbleSort';
import { iSort } from './algorithms/insertionSort';
import { hSort } from './algorithms/heapSort';
import { fisher_yeats } from './algorithms/shuffle';

/* -------- CONSTANTS -------- */
const NORMAL = 0;
const ACTIVE = 1;
const COMPARE = 2;
const PIVOT = 3;
const SORTED = 4;
const delay = 100;

/* -------- GLOBAL STATES -------- */
var speed = 100;

type BarProps = {
	val: number|string,
	style: React.CSSProperties,
}
const Bar = (props: BarProps) => <div style={props.style}>{props.val}</div>;

type BarContainerProps = {
	numBars: number,
	barArray: number[][]
}
function BarContainer(props: BarContainerProps) {
	const bars = props.barArray;
	const n = props.numBars;
	const moves = bars.map((val:number[],index:number) => {
		const barStyle = {
			width:55/n+"%",
			height:val[0]/n*100+"%",
			left:index*100/n+"%",
			backgroundColor:getColor(val[1])
		};
      	return n <= 40? <Bar val={val[0]} style={barStyle} /> : <Bar val={""} style={barStyle} />;
    });
	return (
		<div id="barContainer">
			{moves}
		</div>
	);
}

class BigContainer extends React.Component {
	public state = {
		numBars: 30,
		barArray: makeArray(30),
		active: false,
	}
	handleNumBarsChange() {
		var n:number = parseInt((document.getElementById('barSlider') as HTMLInputElement).value);
		(document.getElementById("barSliderDisplay") as HTMLLabelElement).innerHTML = "# BARS: "+n;
		this.setState({
			numBars: n,
			barArray: makeArray(n),
			active: false,
		});
	}
	handleSpeedChange() {
		speed = parseInt((document.getElementById("speedSlider") as HTMLInputElement).value);
		(document.getElementById("speedSliderDisplay") as HTMLLabelElement).innerHTML = "SPEED: "+(speed/1000)+"s";
	}
	handleStop() {
		this.setState({
			active: false,
		});
		this.setColor(NORMAL);
	}
	reset(i:number) {
		var arr = this.state.barArray.slice();
		arr[i][1] = NORMAL;
		this.setState({
			barArray: arr,
		});
	}
	swap(i:number,j:number,resetLast:boolean) {
		var arr = this.state.barArray.slice();
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		arr[i][1] = COMPARE;
		arr[j][1] = COMPARE;
		this.setState({
			barArray: arr,
		});
		if (i !== j) setTimeout(()=>this.reset(i),speed);
		if (i !== j && resetLast) setTimeout(()=>this.reset(j),speed);
	}
	setOneBar(index:number,color:number) {
		var arr = this.state.barArray.slice();
		arr[index][1] = color;
		this.setState({
			barArray: arr,
		});
	}
	setColor(color:number) {
		var arr = this.state.barArray.slice();
		for (let i = 0; i < arr.length; i++) {
			arr[i][1] = color;
		}
		this.setState({
			barArray: arr,
		});
	}
	setActive(f:number,t:number,quickSort:boolean) {
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
	shuffle(instant:boolean) {
		if (this.state.active) return;
		this.setColor(NORMAL);
		var arr = this.state.barArray.slice();
		var seq = fisher_yeats(arr);
		if (instant) {
			this.setState({
				barArray: arr,
			});
			return;
		}
		this.handleSequence(seq);
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
		this.handleSequence(hSort(arr));
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
	handleSequence(seq:number[][]) {
		var numMoves = seq.length;
		this.setState({active: true});
		setTimeout(()=>this.handleSequenceLoop(0,numMoves,seq),delay);
	}
	handleSequenceLoop(cur:number,upTo:number,seq:any[][]) {
		if (!this.state.active) return;
		if (cur >= upTo) {
			this.setState({active: false});
			if (sorted(this.state.barArray)) setTimeout(()=>this.setColor(SORTED), speed);
			else setTimeout(()=>this.setColor(NORMAL), speed);
			return;
		}
		if (seq[cur].length === 2) {
			this.swap(seq[cur][0] as number, seq[cur][1] as number, true);
		}
		else if (seq[cur].length === 3) {
			this.swap(seq[cur][0] as number, seq[cur][1] as number, false);
			this.setOneBar(seq[cur][2] as number,SORTED);
		}
		else if (seq[cur].length === 4) {
			this.setActive(seq[cur][2] as number,seq[cur][3] as number, true);
			this.swap(seq[cur][0] as number, seq[cur][1] as number, true);
		}
		else if (seq[cur].length === 5) {
			this.setActive(seq[cur][1] as number, seq[cur][2] as number, false);
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
				<label htmlFor="barSlider" id="barSliderDisplay"># BARS: 30</label><br/><br/>
				<input 
					type="range" 
					min="10" max="700" defaultValue="100" step="10"
					name="speedSlider" id="speedSlider" onInput={() => this.handleSpeedChange()} /><br/>
				<label htmlFor="speedSlider" id="speedSliderDisplay">SPEED: 0.1 s</label><br/>
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

/* -------- UTILITY FUNCTIONS -------- */
function makeArray(n:number) {
	var ans:number[][] = [];
	for (let i = 1; i <= n; i++) ans.push([i,NORMAL]);
	return ans;
}
function getColor(state:number) {
	return state===NORMAL?
		"rgb(60,60,120)" : state===ACTIVE?
			"rgb(100,100,255)" : state===COMPARE?
				"red" : state===PIVOT?
					"blue" : "rgb(80,210,80)";
}
function sorted(arr:number[][]) {
	for (let i = 0; i < arr.length-1; i++) {
		if (arr[i][0] > arr[i+1][0]) return false;
	}
	return true;
}

/* -------- RENDER -------- */
ReactDOM.render(<BigContainer />, document.getElementById("root"));
