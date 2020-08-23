import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Plot = (props: {data: any[][]}) => {
	useEffect(() => drawChart());
	function drawChart() {
		const dataset = props.data;
		d3.select("#chart").remove();
		const numPoints = 130;
		const maxRuntime = 5000;
		const height = 300;
		const width = 400;
		var svg = d3.select("body").append("svg").attr("width",width).attr("height",height).attr("id","chart");
		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("svg:circle")
			.attr("cx", (d) => (d[0]/numPoints*(width-100)))
			.attr("transform", "translate(50,"+(height+10)+")")
			.attr("cy", (d) => (height*.8- d[1]/maxRuntime*(height*.8)))
			.attr("transform", "translate(50,10)")
			.attr("r", 4)
			.attr("fill", (d) => getColor(d[2]))
			.append("svg:title")
   				.text((d) => d[2] + ": (" + d[0] + "," + d[1] + ")");
   		/* Axes */
		var xScale = d3.scaleLinear()
			.domain([0,numPoints])
			.range([0, width-100]);
		var xAxis = d3.axisBottom(xScale);
		var yScale = d3.scaleLinear()
			.domain([0,maxRuntime])
			.range([height*.8,0]);
		var yAxis = d3.axisLeft(yScale);
		svg.append("g")
			.attr("transform", "translate(50,10)")
			.call(yAxis);
		svg.append("g")
			.attr("transform", "translate(50,"+(height*.8+10)+")")
			.call(xAxis);
	}
	return <div></div>;
};

export function getColor(algo:string) {
	switch (algo) {
		case 'bSort': return "rgb(255,0,0)";
		case 'iSort': return "rgb(0,220,0)";
		case 'hSort': return "rgb(0,0,220)";
		case 'qSort': return "rgb(220,100,0)";
		case 'mSort': return "rgb(220,0,220)";
		case 'shuffle': return "rgb(15,15,15)";
	}
	return "black";
}

export { Plot };
