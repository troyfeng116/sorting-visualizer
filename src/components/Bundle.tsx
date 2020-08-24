import React from 'react';

/* -------- ALGORITHMS -------- */
import { fisher_yeats } from './../algorithms/shuffle';
import { generateSample } from './../algorithms/sample';

/* -------- CONSTANTS & UTILITIES -------- */
import { NORMAL, ACTIVE, COMPARE, PIVOT, SORTED, DELAY } from './../utility/constants';
import { algoStrings, algoFunctions, algoFullNames, algoTable } from './../utility/constants';
import { makeArray, sorted, getAlgoColor } from './../utility/functions';
/* -------- COMPONENTS -------- */
import { Bar } from './Bar';
import { Plot } from './Plot';
import { Legend } from './Legend';

type BundleState = {
	numBars:number,
	barArray:number[][],
	currentlyRunning:boolean,
	speed:number,
	runtimes:any[]
}

class Bundle extends React.Component {
	public state:BundleState = {
		numBars: 50,
		barArray: makeArray(50),
		currentlyRunning: false,
		speed: 100,
		runtimes: []
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
		this.setState({currentlyRunning: false,});
		this.setColor(NORMAL);
	}
	reset(i:number) {
		var arr = this.state.barArray.slice();
		if (i >= arr.length) return;
		arr[i][1] = NORMAL;
		this.setState({barArray: arr});
	}
	swap(i:number,j:number,resetLast:boolean) {
		var arr = this.state.barArray.slice();
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		arr[i][1] = COMPARE;
		arr[j][1] = COMPARE;
		this.setState({barArray: arr});
		if (resetLast) setTimeout(()=>{this.reset(i); this.reset(j)}, this.state.speed);
		else if (i !== j) setTimeout(()=>{this.reset(i)}, this.state.speed);
	}
	setOneBar(index:number,color:number) {
		var arr = this.state.barArray.slice();
		arr[index][1] = color;
		this.setState({barArray: arr});
	}
	setColor(color:number) {
		var arr = this.state.barArray.slice();
		for (let i = 0; i < arr.length; i++) {
			arr[i][1] = color;
		}
		this.setState({barArray: arr});
	}
	setActive(f:number,t:number,quickSort:boolean) {
		var arr = this.state.barArray.slice();
		for (let k = 0; k < arr.length; k++) arr[k][1] = NORMAL;
		for (let k = f; k <= t; k++) {
			arr[k][1] = ACTIVE;
		}
		if (quickSort) arr[t][1] = PIVOT;
		this.setState({barArray:arr});
	}
	applyAlgorithm(algo: string) {
		if (this.state.currentlyRunning) return;
		var arr = this.state.barArray.slice();
		if (algo === 'instantShuffle' || algo === 'shuffle') {
			this.setColor(NORMAL);
			var seq = fisher_yeats(arr);
			if (algo === 'shuffle') this.handleSequence(seq, 'shuffle');
			else this.setState({barArray:arr});
			return;
		}
		if (sorted(arr)) {
			this.setColor(SORTED);
			return;
		}
		this.handleSequence(algoFunctions[algoTable.get(algo)](arr),algo);
	}
	handleSequence(seq:number[][], algo:string) {
		var numMoves = seq.length;
		var newRuntimes = this.state.runtimes.slice();
		newRuntimes.push([this.state.numBars, numMoves, algo]);
		this.setState({runtimes: newRuntimes});
		(document.getElementById(algo) as HTMLDivElement).style.backgroundColor = getAlgoColor(algo);
		(document.getElementById(algo) as HTMLDivElement).style.color = "white";
		this.setState({currentlyRunning: true});
		setTimeout(()=>this.handleSequenceLoop(0,numMoves,seq,algo),DELAY);
	}
	handleSequenceLoop(cur:number,upTo:number,seq:any[][],algo:string) {
		if (!this.state.currentlyRunning) {
			(document.getElementById(algo) as HTMLDivElement).style.backgroundColor = "";
			(document.getElementById(algo) as HTMLDivElement).style.color = "";
			return;
		}
		if (cur >= upTo) {
			this.setState({currentlyRunning: false});
			if (sorted(this.state.barArray)) setTimeout(()=>this.setColor(SORTED), this.state.speed);
			else setTimeout(()=>this.setColor(NORMAL), this.state.speed);
			(document.getElementById(algo) as HTMLDivElement).style.backgroundColor = "";
			(document.getElementById(algo) as HTMLDivElement).style.color = "";
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
			this.setState({barArray: newArr});
		}
		setTimeout(()=>this.handleSequenceLoop(cur+1,upTo,seq,algo), this.state.speed);
	}
	getSample(algo:string) {
		var arr = this.state.runtimes;
		var toAppend = generateSample(algo);
		toAppend.forEach((point) => arr.push(point));
		this.setState({runtimes: arr});
	}
	resetRuntimes() {
		this.setState({runtimes:[]});
	}
	render() {
		const algoList = algoStrings.map((value,index) => {
			return index < 5 ? (
				<li>
					<div id={value} onClick={()=>this.applyAlgorithm(value)}>
						{algoFullNames[index]}
					</div>
				</li>) : null;
		});
		const menuBar = <ul id="menuBar">{algoList}</ul>;
		const sampleList = algoStrings.map((value,index) => {
			return index < 5 ? <li><div onClick={()=>this.getSample(value)}>Sample</div></li> : null;
		})
		const sampleBar = <ul id="sampleBar">{sampleList}</ul>;
		const otherButtons = (
			<div id="otherButtonsContainer">
				<div id='shuffle' onClick={()=>this.applyAlgorithm('shuffle')}>Shuffle</div><br/>
				<div id='instantShuffle' onClick={()=>this.applyAlgorithm('instantShuffle')}>Instant Shuffle</div><br/>
				<div onClick={()=>this.handleStop()}>Stop</div>
			</div>
		);
		const sliderContainer = (
			<div id="sliderContainer">
				<input 
					type="range" 
					min="5" max="128" defaultValue="50" 
					name="barSlider" id="barSlider" 
					onInput={() => this.handleNumBarsChange()} /><br/>
				<label htmlFor="barSlider" id="barSliderDisplay"># BARS: 50</label><br/><br/>
				<input 
					type="range" 
					min="10" max="700" defaultValue="100" step="10"
					name="speedSlider" id="speedSlider" onInput={() => this.handleSpeedChange()} /><br/>
				<label htmlFor="speedSlider" id="speedSliderDisplay">SPEED: 0.1 s</label><br/>
			</div>
		);
		const bars = <Bar data={this.state.barArray} />;
		const graph = <Plot data={this.state.runtimes} />;
		const legend = <div id="legendContainer">
			<Legend />
			<div id="sampleButton" onClick={() => this.getSample('all')}>Sample</div>
			<div id="resetButton" onClick={() => this.resetRuntimes()}>Reset</div>
		</div>;
		return (
			<div id="Bundle">
				{menuBar}
				{sampleBar}
				{otherButtons}
				{sliderContainer}
				{bars}
				{graph}
				{legend}
			</div>
		);
	}
}

export { Bundle };
