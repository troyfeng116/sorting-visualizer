import './Bar.css'
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { getColor } from '../../utility/functions';

const  Bar = (props: {data:any[][]}) => {
    useEffect(() => drawChart(), [props.data]);
    function drawChart() {
    	const data = props.data;
    	d3.select("#barContainer").remove();
    	const svg = d3.select(".bar-container").append("svg").attr("width", "100%").attr("height", "100%").attr("id","barContainer");
    	svg.selectAll("rect")
  			.data(data)
  			.enter()
  			.append("rect")
  			.attr("x", (d, i) => (i*100/data.length)+"%")
  			.attr("y", (d, i) => (100 - 100/data.length*d[0])+"%")
  			.attr("width", (55/data.length)+"%")
  			.attr("height", (d, i) => 100/data.length*d[0]+"%")
  			.attr("fill", (d, i) => getColor(d[1]));
    }
    return <></>;
}

export { Bar };