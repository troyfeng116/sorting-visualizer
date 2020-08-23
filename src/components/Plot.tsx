import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Plot = (props: {data: number[][]}) => {
	useEffect(() => drawChart());
	function drawChart() {
		const dataset = props.data;
		const numPoints = 128-5+1;
		d3.select("#chart").remove();
		var svg = d3.select("body").append("svg").attr("width","25%").attr("height","25%").attr("id","chart");
		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				return d[0]*10;
			})
			.attr("cy", function(d) {
				return (100-d[1])+"%";
			})
			.attr("r", 2);
	}
	return <div></div>;
};

export { Plot };
