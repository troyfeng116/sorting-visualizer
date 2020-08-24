import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { getAlgoColor } from './../utility/functions'

const Plot = React.memo((props: {data: any[][]}) => {
	useEffect(() => drawChart()/*, [data]*/);
	function drawChart() {
		const dataset = props.data;
		d3.select("#chart").remove();
		const numPoints = 130;
		const maxRuntime = 5000;
		const height = 400;
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
			.attr("fill", (d) => getAlgoColor(d[2]))
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
		svg.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "end")
    		.attr("x", width)
    		.attr("y",height-10)
    		.text("# bars");
    	svg.append("text")
    		.attr("class", "y label")
			.attr("text-anchor", "end")
			.attr("y",10)
    		.attr("transform", "rotate(-90)")
    		.text("# compares");
	}
	return null;
});

export { Plot };
