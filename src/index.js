import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Bar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>DIV {this.props.val}</div>
		);
	}
}

class BarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			numBars: 10,
			barArray: [1,2,3,4,5,6,7,8,9,10],
		};
	}
	renderBar(i) {
		return (
			<Bar val={i} />
		);
	}

	render() {
		const bars = this.state.barArray;
		const moves = bars.map((index) => {
      		return this.renderBar(index);
    	});

		return (
			<div id="barContainer">
				{moves}
			</div>
		);
	}
}

ReactDOM.render(<BarContainer />, document.getElementById("root"));
