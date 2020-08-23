import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Plot = (props: {data: any[][]}) => {
	useEffect(() => drawChart());
	function drawChart() {
		const dataset = props.data;
		d3.select("#chart").remove();
		const numPoints = 135;
		const maxRuntime = 5000;
		var svg = d3.select("body").append("svg").attr("width","50%").attr("height","50%").attr("id","chart");
		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("svg:circle")
			.attr("cx", (d) => (100/numPoints)*d[0]+"%")
			.attr("cy", (d) => (50)+"%")
			.attr("r", 4)
			.attr("fill", (d) => getColor(d[2]));
		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
				.text((d) => d[2] + ": (" + d[0] + "," + d[1] + ")")
				.attr("x", (d) => (100/numPoints)*d[0]+"%")
				.attr("y", (d) => (50)+"%")
				.attr("font-size", "11px")
				.attr("fill", "red");
	}
	return <div>{props.data}</div>;
};

function getColor(algo:string) {
	switch (algo) {
		case 'bSort': return "red";
		case 'iSort': return "orange";
		case 'hSort': return "yellow";
		case 'qSort': return "green";
		case 'mSort': return "blue";
		case 'shuffle': return "purple";
	}
	return "black";
}

export { Plot };
