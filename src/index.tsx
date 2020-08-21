import React, { useState } from 'react';
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

type BarProps = {
	val: number|string,
	style: React.CSSProperties,
}

/* ES6 arrow function component. */
const Bar = (props: BarProps) => <div style={props.style}>{props.val}</div>;

type BarContainerProps = {
	numBars: number,
	barArray: number[][]
}

/* Regular ts function component. */
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

const BigContainer = () => {
	const [numBars, setNumBars] = useState(30);
	const [barArray, setBarArray] = useState(makeArray(30));
	const [active, setActive] = useState(false);
	
	function handleNumBarsChange() {
		var n:number = parseInt((document.getElementById('barSlider') as HTMLInputElement).value);
		(document.getElementById("barSliderDisplay") as HTMLLabelElement).innerHTML = "# BARS: "+n;
		setNumBars(n);
		setBarArray(makeArray(n));
		setActive(false);
	}
	function handleSpeedChange() {
		speed = parseInt((document.getElementById("speedSlider") as HTMLInputElement).value);
		(document.getElementById("speedSliderDisplay") as HTMLLabelElement).innerHTML = "SPEED: "+(speed/1000)+"s";
	}
	function handleStop() {
		setActive(false);
		setColor(NORMAL);
	}
	function reset(i:number) {
		var arr = barArray.slice();
		arr[i][1] = NORMAL;
		setBarArray(arr);
	}
	function swap(i:number,j:number,resetLast:boolean) {
		var arr = barArray.slice();
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		arr[i][1] = COMPARE;
		arr[j][1] = COMPARE;
		setBarArray(arr);
		if (i !== j) setTimeout(()=>reset(i),speed);
		if (i !== j && resetLast) setTimeout(()=>reset(j),speed);
	}
	function setOneBar(index:number,color:number) {
		var arr = barArray.slice();
		arr[index][1] = color;
		setBarArray(arr);
	}
	function setColor(color:number) {
		var arr = barArray.slice();
		for (let i = 0; i < arr.length; i++) {
			arr[i][1] = color;
		}
		setBarArray(arr);
	}
	function setRangeActive(f:number,t:number,quickSort:boolean) {
		var arr = barArray.slice();
		for (let k = 0; k < arr.length; k++) arr[k][1] = NORMAL;
		for (let k = f; k <= t; k++) {
			arr[k][1] = ACTIVE;
		}
		if (quickSort) arr[t][1] = PIVOT;
		setBarArray(arr);
	}
	function shuffle(instant:boolean) {
		(document.getElementById("test") as HTMLDivElement).innerHTML += active;
		if (active) return;
		setColor(NORMAL);
		if (instant) {
			var arr = barArray.slice();
			for (let i = numBars-1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i+1));
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
			setBarArray(arr);
			return;
		}
		setActive(true);
		setTimeout(()=>shuffleLoop(numBars-1), delay);
	}
	function shuffleLoop(i:number) {
		if (active === false) return;
		if (i < 1) {
			setActive(false);
			return;
		}
		var j = Math.floor(Math.random() * (i+1));
		swap(i,j,true);
		setTimeout(()=>shuffleLoop(i-1),speed);
	}
	function bubbleSort() {
		if (active) return;
		var arr = barArray.slice();
		if (sorted(arr)) {
			setColor(SORTED);
			return;
		}
		handleSequence(bSort(arr));
	}
	function insertionSort() {
		if (active) return;
		var arr = barArray.slice();
		if (sorted(arr)) {
			setColor(SORTED);
			return;
		}
		handleSequence(iSort(arr));
	}
	function heapSort() {
		if (active) return;
		var arr = barArray.slice();
		if (sorted(arr)) {
			setColor(SORTED);
			return;
		}
		handleSequence(hSort(arr));
	}
	function quickSort() {
		if (active) return;
		var arr = barArray.slice();
		if (sorted(arr)) {
			setColor(SORTED);
			return;
		}
		handleSequence(qSort(arr));
	}
	function mergeSort() {
		(document.getElementById("test") as HTMLDivElement).innerHTML += active;
		if (active) return;
		var arr = barArray.slice();
		if (sorted(arr)) {
			setColor(SORTED);
			return;
		}
		var sequence = mSort(arr);
		var test = sequence[sequence.length-1];
		(document.getElementById("test") as HTMLDivElement).innerHTML += test;
		handleSequence(mSort(arr));
	}
	function handleSequence(seq:number[][]) {
		var numMoves = seq.length;
		setActive(true);
		(document.getElementById("test") as HTMLDivElement).innerHTML += active;
		setTimeout(()=>handleSequenceLoop(0,numMoves,seq),delay);
		(document.getElementById("test") as HTMLDivElement).innerHTML += active;
	}
	function handleSequenceLoop(cur:number,upTo:number,seq:any[][]) {
		if (!active) return;
		if (cur >= upTo) {
			setActive(false);
			if (sorted(barArray)) setTimeout(()=>setColor(SORTED), speed);
			return;
		}
		if (seq[cur].length === 2) {
			swap(seq[cur][0] as number, seq[cur][1] as number, true);
		}
		else if (seq[cur].length === 3) {
			swap(seq[cur][0] as number, seq[cur][1] as number, false);
			setOneBar(seq[cur][2] as number,SORTED);
		}
		else if (seq[cur].length === 4) {
			setRangeActive(seq[cur][2] as number,seq[cur][3] as number, true);
			swap(seq[cur][0] as number, seq[cur][1] as number, true);
		}
		else if (seq[cur].length === 5) {
			setRangeActive(seq[cur][1] as number, seq[cur][2] as number, false);
			var newArr = seq[cur][0];
			newArr[seq[cur][3]][1] = COMPARE;
			newArr[seq[cur][4]][1] = COMPARE;
			setBarArray(newArr);
		}
		setTimeout(()=>handleSequenceLoop(cur+1,upTo,seq), speed);
	}
		
	const menuBar = (
		<ul id="menuBar">
			<li><div onClick={()=>bubbleSort()}>Bubble Sort</div></li>
			<li><div onClick={()=>insertionSort()}>Insertion Sort</div></li>
			<li><div onClick={()=>heapSort()}>Heap Sort</div></li>
			<li><div onClick={()=>quickSort()}>Quick Sort</div></li>
			<li><div onClick={()=>mergeSort()}>Merge Sort</div></li>
		</ul>
	);
	const otherButtons = (
		<div id="otherButtonsContainer">
			<div onClick={()=>shuffle(false)}>Shuffle</div><br/>
			<div onClick={()=>shuffle(true)}>Instant Shuffle</div><br/>
			<div onClick={()=>handleStop()}>Stop</div>
		</div>
	);
	const sliderContainer = (
		<div id="sliderContainer">
			<input 
				type="range" 
				min="5" max="75" defaultValue="30" 
				name="barSlider" id="barSlider" 
				onInput={() => handleNumBarsChange()} /><br/>
			<label htmlFor="barSlider" id="barSliderDisplay"># BARS: 30</label><br/><br/>
			<input 
				type="range" 
				min="10" max="700" defaultValue="100" step="10"
				name="speedSlider" id="speedSlider" onInput={() => handleSpeedChange()} /><br/>
			<label htmlFor="speedSlider" id="speedSliderDisplay">SPEED: 0.1 s</label><br/>
		</div>
	);
	const barContainer = (<BarContainer numBars={numBars} barArray={barArray} />);
	return (
		<div id="menuBarContainer">
			{menuBar}
			{otherButtons}
			{sliderContainer}
			{barContainer}
			<div id="test">TEST</div>
		</div>
	);
}

/* -------- SORTING ALGORITHMS -------- */
function bSort(arr:number[][]) {
	var sequence = [];
	for (let end = arr.length-1; end > 0; end--) {
		for (let i = 0; i < end; i++) {
			if (arr[i][0] > arr[i+1][0]) {
				var temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
				if (i === end-1) sequence.push([i,i+1,i+1]);
				else sequence.push([i,i+1]);
			}
			if (i === end-1) sequence.push([i+1,i+1,i+1]);
		}
	}
	return sequence;
}
function iSort(arr:number[][]) {
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
function hSort(arr:number[][]) {
	var sequence: number[][] = [];
	var size = arr.length;
	for (let i = size-1; i >= 0; i--) {
		heapify(arr,i,size,sequence);
	}
	for (let last = size-1; last > 0; last--) {
		var temp = arr[0];
		arr[0] = arr[last];
		arr[last] = temp;
		sequence.push([0,last,last]);
		heapify(arr,0,last,sequence);
	}
	return sequence;
}
function heapify(arr:number[][],index:number,size:number,seq:number[][]) {
	var maxIndex = index;
	var lChild = 2*index+1;
	var rChild = 2*index+2;
	if (lChild < size && arr[lChild][0] > arr[maxIndex][0]) maxIndex = lChild;
	if (rChild < size && arr[rChild][0] > arr[maxIndex][0]) maxIndex = rChild;
	if (maxIndex !== index) {
		var temp = arr[index];
		arr[index] = arr[maxIndex];
		arr[maxIndex] = temp;
		seq.push([index,maxIndex]);
		heapify(arr,maxIndex,size,seq);
	}
}
function qSort(arr:number[][]) {
	var sequence:number[][] = [];
	qSortAux(arr,0,arr.length-1,sequence);
	return sequence;
}
function qSortAux(arr:number[][], l:number, r:number, sequence:number[][]) {
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
function mSort(arr:number[][]) {
	var sequence:any[][] = [];
	mSortAux(arr,0,arr.length-1,sequence);
	return sequence;
}
function mSortAux(arr:number[][],l:number,r:number,sequence:any[][]) {
	if (l >= r) return;
	var m = Math.floor((l+r)/2);
	mSortAux(arr,l,m,sequence);
	mSortAux(arr,m+1,r,sequence);
	merge(arr,l,r,sequence);
}
function merge(arr:number[][],l:number,r:number,sequence:any[][]) {
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
