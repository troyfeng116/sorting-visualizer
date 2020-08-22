import React from 'react';

/* -------- ALGORITHMS -------- */
import { mSort } from './../algorithms/mergeSort';
import { qSort } from './../algorithms/quickSort';
import { bSort } from './../algorithms/bubbleSort';
import { iSort } from './../algorithms/insertionSort';
import { hSort } from './../algorithms/heapSort';
import { fisher_yeats } from './../algorithms/shuffle';

/* -------- CONSTANTS & UTILITIES -------- */
import { NORMAL, ACTIVE, COMPARE, PIVOT, SORTED, DELAY } from './../utility/constants';
import { makeArray, sorted } from './../utility/functions';

/* -------- COMPONENTS -------- */
import { BarContainer } from './BarContainer';

export class Bundle extends React.Component {
	public state = {
		numBars: 30,
		barArray: makeArray(30),
		currentlyRunning: false,
		speed: 100
	}
	handleNumBarsChange() {
		var n:number = parseInt((document.getElementById('barSlider') as HTMLInputElement).value);
		(document.getElementById("barSliderDisplay") as HTMLLabelElement).innerHTML = "# BARS: "+n;
		this.setState({
			numBars: n,
			barArray: makeArray(n),
			currentlyRunning: false,
		});
	}
	handleSpeedChange() {
		var newSpeed = parseInt((document.getElementById("speedSlider") as HTMLInputElement).value);
		(document.getElementById("speedSliderDisplay") as HTMLLabelElement).innerHTML = "SPEED: "+(newSpeed/1000)+"s";
		this.setState({speed: newSpeed});
	}
	handleStop() {
		this.setState({
			currentlyRunning: false,
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
		if (resetLast) setTimeout(()=>{this.reset(i); this.reset(j)}, this.state.speed);
		else if (i !== j) setTimeout(()=>{this.reset(i)}, this.state.speed);
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
	applyAlgorithm(algo: string) {
		if (this.state.currentlyRunning) return;
		var arr = this.state.barArray.slice();
		if (algo === 'instantShuffle' || algo === 'shuffle') {
			this.setColor(NORMAL);
			var seq = fisher_yeats(arr);
			if (algo === 'shuffle') this.handleSequence(seq);
			else this.setState({barArray:arr});
			return;
		}
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		switch(algo) {
			case 'bSort': this.handleSequence(bSort(arr)); break;
			case 'iSort': this.handleSequence(iSort(arr)); break;
			case 'hSort': this.handleSequence(hSort(arr)); break;
			case 'qSort': this.handleSequence(qSort(arr)); break;
			case 'mSort': this.handleSequence(mSort(arr)); break;
		}
	}
	handleSequence(seq:number[][]) {
		var numMoves = seq.length;
		this.setState({currentlyRunning: true});
		setTimeout(()=>this.handleSequenceLoop(0,numMoves,seq),DELAY);
	}
	handleSequenceLoop(cur:number,upTo:number,seq:any[][]) {
		if (!this.state.currentlyRunning) return;
		if (cur >= upTo) {
			this.setState({currentlyRunning: false});
			if (sorted(this.state.barArray)) setTimeout(()=>this.setColor(SORTED), this.state.speed);
			else setTimeout(()=>this.setColor(NORMAL), this.state.speed);
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
		setTimeout(()=>this.handleSequenceLoop(cur+1,upTo,seq), this.state.speed);
	}
	render() {
		const menuBar = (
			<ul id="menuBar">
				<li><div onClick={()=>this.applyAlgorithm('bSort')}>Bubble Sort</div></li>
				<li><div onClick={()=>this.applyAlgorithm('iSort')}>Insertion Sort</div></li>
				<li><div onClick={()=>this.applyAlgorithm('hSort')}>Heap Sort</div></li>
				<li><div onClick={()=>this.applyAlgorithm('qSort')}>Quick Sort</div></li>
				<li><div onClick={()=>this.applyAlgorithm('mSort')}>Merge Sort</div></li>
			</ul>
		);
		const otherButtons = (
			<div id="otherButtonsContainer">
				<div onClick={()=>this.applyAlgorithm('shuffle')}>Shuffle</div><br/>
				<div onClick={()=>this.applyAlgorithm('instantShuffle')}>Instant Shuffle</div><br/>
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
			<div>
				{menuBar}
				{otherButtons}
				{sliderContainer}
				{barContainer}
			</div>
		);
	}
}