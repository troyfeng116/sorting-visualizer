import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Plot = (props: {data: any[][]}) => {
	useEffect(() => drawChart());
	function drawChart() {
		const dataset = props.data;
		d3.select("#chart").remove();
		const numPoints = 130;
		const maxRuntime = 5000;
		const height = 800;
		const width = 800;
		var svg = d3.select("body").append("svg").attr("width",width).attr("height",height).attr("id","chart");
		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("svg:circle")
			.attr("cx", (d) => (d[0]/numPoints*(width-100)))
			.attr("transform", "translate(50,"+(height/2+10)+")")
			.attr("cy", (d) => (height/2 - d[1]/maxRuntime*(height/2)))
			.attr("transform", "translate(50,10)")
			.attr("r", 4)
			.attr("fill", (d) => getColor(d[2]));
		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
				.text((d) => d[2] + ": (" + d[0] + "," + d[1] + ")")
				.attr("x", (d) => (d[0]/numPoints*(width-100))+10)
				.attr("transform", "translate(50,"+(height/2+10)+")")
				.attr("y", (d) => (height/2 - d[1]/maxRuntime*(height/2)))
				.attr("transform", "translate(50,10)")
				.attr("font-size", "11px")
				.attr("fill", (d) => getColor(d[2]));
		var xScale = d3.scaleLinear()
			.domain([0,numPoints])
			.range([0, width-100]);
		var xAxis = d3.axisBottom(xScale);
		var yScale = d3.scaleLinear()
			.domain([0,maxRuntime])
			.range([height/2,0]);
		var yAxis = d3.axisLeft(yScale);
		svg.append("g")
			.attr("transform", "translate(50,10)")
			.call(yAxis);
		svg.append("g")
			.attr("transform", "translate(50,"+(height/2+10)+")")
			.call(xAxis);
	}
	return <div></div>;
};

function getColor(algo:string) {
	switch (algo) {
		case 'bSort': return "red";
		case 'iSort': return "orange";
		case 'hSort': return "pink";
		case 'qSort': return "green";
		case 'mSort': return "blue";
		case 'shuffle': return "black";
	}
	return "black";
}

export { Plot };
