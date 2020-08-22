import React from 'react';

import { getColor } from './../utility/functions';
import { Bar } from './Bar';

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

export { BarContainer };