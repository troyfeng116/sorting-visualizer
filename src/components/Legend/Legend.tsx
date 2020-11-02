import './Legend.css'
import React from 'react';
import * as d3 from 'd3';
import { getAlgoColor } from '../../utility/functions';

const Legend = () => {
	d3.select("#legend").remove();
	const svg = d3.select("body").append("svg").attr("width", 100).attr("height",120).attr("id","legend");
	createLegendEntry(svg, 10, 'bSort');
	createLegendEntry(svg, 30, 'iSort');
	createLegendEntry(svg, 50, 'hSort');
	createLegendEntry(svg, 70, 'qSort');
	createLegendEntry(svg, 90, 'mSort');
	createLegendEntry(svg, 110, 'shuffle');
	return <div></div>;
}

function createLegendEntry(svg:d3.Selection<SVGSVGElement,unknown,HTMLElement,any>, h:number, algo:string) {
	svg.append("circle").attr("cx",10).attr("cy",h).attr("r", 6).style("fill", getAlgoColor(algo));
	svg.append("text").attr("x", 20).attr("y", h).text(algo).attr("alignment-baseline","middle");
}

export { Legend };