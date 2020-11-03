import './Bundle.css'
import React from 'react';

/* -------- ALGORITHMS -------- */
import { fisher_yates } from './../algorithms/shuffle';
import { generateSample } from './../algorithms/sample';

/* -------- CONSTANTS & UTILITIES -------- */
import { NORMAL, ACTIVE, COMPARE, PIVOT, SORTED, DELAY } from './../utility/constants';
import { algoStrings, algoFunctions, algoFullNames, algoTable } from './../utility/constants';
import { makeArray, sorted, getAlgoColor } from './../utility/functions';

/* -------- COMPONENTS -------- */
import { Bar } from './Bar/Bar';
import { Plot } from './Plot/Plot';
import { Legend } from './Legend/Legend';

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
		(document.getElementById("barSliderDisplay") as HTMLLabelElement).innerHTML = "# Bars: "+n;
		this.setState({
			numBars: n,
			barArray: makeArray(n),
			currentlyRunning: false,
		});
	}
	handleSpeedChange() {
		var newSpeed = parseInt((document.getElementById("speedSlider") as HTMLInputElement).value);
		(document.getElementById("speedSliderDisplay") as HTMLLabelElement).innerHTML = "Speed: "+(newSpeed/1000)+"s";
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
		for (let i = 0; i < arr.length; i++) arr[i][1] = color;
		this.setState({barArray: arr});
	}
	setActive(f:number,t:number,quickSort:boolean) {
		var arr = this.state.barArray.slice();
		for (let k = 0; k < arr.length; k++) arr[k][1] = NORMAL;
		for (let k = f; k <= t; k++) arr[k][1] = ACTIVE;
		if (quickSort) arr[t][1] = PIVOT;
		this.setState({barArray:arr});
	}
	applyAlgorithm(algo: string) {
		if (this.state.currentlyRunning) return;
		var arr = this.state.barArray.slice();
		if (algo === 'instantShuffle' || algo === 'shuffle') {
			this.setColor(NORMAL);
			var seq = fisher_yates(arr);
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
		if (this.state.currentlyRunning) return;
		var arr = this.state.runtimes.slice();
		var toAppend = generateSample(algo);
		toAppend.forEach((point) => arr.push(point));
		this.setState({runtimes: arr});
	}
	resetRuntimes() {
		if (!this.state.currentlyRunning) this.setState({runtimes:[]});
	}
	render() {
		const menuButtons = new Array(5);
		for (let i = 0; i < 5; i++) {
			menuButtons[i] = (
				<div className='menubar-cell' key={i}>
					<div className='menubar-cell-top' id={algoStrings[i]} onClick={()=>this.applyAlgorithm(algoStrings[i])}>
						{algoFullNames[i]}
					</div>
					<div className='menubar-cell-bottom' onClick={()=>this.getSample(algoStrings[i])}>
						Sample
					</div>
				</div>
			)
		}
		const otherButtons = (
			<div id="otherButtonsContainer">
				<div className='other-button' id='shuffle' onClick={()=>this.applyAlgorithm('shuffle')}>Shuffle</div><br/>
				<div className='other-button' id='instantShuffle' onClick={()=>this.applyAlgorithm('instantShuffle')}>Instant Shuffle</div><br/>
				<div className='other-button' onClick={()=>this.handleStop()}>Stop</div>
			</div>
		);
		const sliderContainer = (
			<div id="sliderContainer">
				<input 
					type="range" 
					min="5" max="128" defaultValue="50" 
					name="barSlider" id="barSlider" 
					onInput={() => this.handleNumBarsChange()} /><br/>
				<label htmlFor="barSlider" id="barSliderDisplay"># Bars: 50</label><br/><br/>
				<input 
					type="range" 
					min="10" max="700" defaultValue="100" step="10"
					name="speedSlider" id="speedSlider" onInput={() => this.handleSpeedChange()} /><br/>
				<label htmlFor="speedSlider" id="speedSliderDisplay">
					Speed: {this.state.speed/1000}s
				</label><br/>
			</div>
		);
		return (
			<div id="Bundle">
				<div className='bundle-top'>
					<div id="menuBar">{menuButtons}</div>
					<div className='other-buttons-super-container'>{otherButtons}</div>
					<div className='slider-super-container'>{sliderContainer}</div>
				</div>
				<div className='bundle-bottom'>
					<div className='bar-container'><Bar data={this.state.barArray} /></div>
					<div className='bundle-bottom-right'>
						<div className='plot-container'><Plot data={this.state.runtimes} /></div>
						<div className="legend-container">
							<div className='legend-button-container'>
								<div className='legend-button' id="sampleButton" onClick={() => this.getSample('all')}>Sample</div>
								<div className='legend-button' id="resetButton" onClick={() => this.resetRuntimes()}>Reset</div>
							</div>
							<Legend />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { Bundle };
