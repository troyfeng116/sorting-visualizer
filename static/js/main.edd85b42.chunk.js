(this["webpackJsonpsorting-visualizer"]=this["webpackJsonpsorting-visualizer"]||[]).push([[0],{30:function(e,t,r){e.exports=r(40)},35:function(e,t,r){},36:function(e,t,r){},37:function(e,t,r){},38:function(e,t,r){},39:function(e,t,r){},40:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),i=r(14),l=r.n(i),s=(r(35),r(15)),u=r(16),o=r(18),c=r(17);r(36);function h(e){for(var t=[],r=e.length-1;r>0;r--){var n=Math.floor(Math.random()*(r+1)),a=e[r];e[r]=e[n],e[n]=a,t.push([r,n])}return t}function d(e,t,r,n){var a=t,i=2*t+1,l=2*t+2;if(i<r&&e[i][0]>e[a][0]&&(a=i),l<r&&e[l][0]>e[a][0]&&(a=l),a!==t){var s=e[t];e[t]=e[a],e[a]=s,n.push([t,a]),d(e,a,r,n)}}var f=["bSort","iSort","hSort","qSort","mSort","shuffle"],m=[function(e){for(var t=[],r=e.length-1;r>0;r--)for(var n=0;n<r;n++){if(e[n][0]>e[n+1][0]){var a=e[n];e[n]=e[n+1],e[n+1]=a,n===r-1?t.push([n,n+1,n+1]):t.push([n,n+1])}n===r-1&&t.push([n+1,n+1,n+1])}return t},function(e){for(var t=[],r=0;r<e.length;r++)for(var n=e[r],a=r-1;a>=0&&e[a][0]>n[0];)e[a+1]=e[a],e[a]=n,t.push([a,a+1]),a--;return t},function(e){for(var t=[],r=e.length,n=r-1;n>=0;n--)d(e,n,r,t);for(var a=r-1;a>0;a--){var i=e[0];e[0]=e[a],e[a]=i,t.push([0,a,a]),d(e,0,a,t)}return t},function(e){var t=[];return function e(t,r,n,a){if(r>=n)return;for(var i=t[n],l=r,s=r;s<n;s++)if(t[s][0]<i[0]){var u=t[s];t[s]=t[l],t[l]=u,a.push([s,l,r,n]),l++}t[n]=t[l],t[l]=i,a.push([l,n,r,n]),e(t,r,l-1,a),e(t,l+1,n,a)}(e,0,e.length-1,t),t},function(e){var t=[];return function e(t,r,n,a){if(r>=n)return;var i=Math.floor((r+n)/2);e(t,r,i,a),e(t,i+1,n,a),function(e,t,r,n){var a=Math.floor((t+r)/2),i=t,l=a+1;for(;i<=a&&l<=r;)if(e[i][0]<=e[l][0])i++,n.push([e.slice(),t,r,i,l]);else{for(var s=e[l],u=l;u!==i;)e[u]=e[u-1],u--;e[i]=s,i++,a++,++l<=r?n.push([e.slice(),t,r,i,l]):n.push([e.slice(),t,r,i,l-1])}}(t,r,n,a)}(e,0,e.length-1,t),t},h],p=["Bubble Sort","Insertion Sort","Heap Sort","Quick Sort","Merge Sort"],v=new Map;function g(e){for(var t=[],r=1;r<=e;r++)t.push([r,0]);return t}function b(e){for(var t=0;t<e.length-1;t++)if(e[t][0]>e[t+1][0])return!1;return!0}function y(e){switch(e){case"bSort":return"rgb(255,0,0)";case"iSort":return"rgb(0,220,0)";case"hSort":return"rgb(0,150,255)";case"qSort":return"rgb(255,120,0)";case"mSort":return"rgb(220,0,220)";case"shuffle":return"rgb(15,15,15)"}return"black"}function S(e,t,r,n){for(var a=[],i=t;i<=r;i+=n<0?Math.floor(5*Math.random())+3:n){var l=g(i);h(l);var s=m[v.get(e)](l);a.push([i,s.length,e])}return a}f.map((function(e,t){return v.set(e,t)}));r(37);var E=r(1),k=function(e){return Object(n.useEffect)((function(){return function(){var t=e.data;E.d("#barContainer").remove(),E.d(".bar-container").append("svg").attr("width","100%").attr("height","100%").attr("id","barContainer").selectAll("rect").data(t).enter().append("rect").attr("x",(function(e,r){return 100*r/t.length+"%"})).attr("y",(function(e,r){return 100-100/t.length*e[0]+"%"})).attr("width",55/t.length+"%").attr("height",(function(e,r){return 100/t.length*e[0]+"%"})).attr("fill",(function(e,t){return 0===(r=e[1])?"rgb(60,60,120)":1===r?"rgb(100,100,255)":2===r?"red":3===r?"blue":"rgb(80,210,80)";var r}))}()}),[e.data]),a.a.createElement(a.a.Fragment,null)},A=(r(38),a.a.memo((function(e){return Object(n.useEffect)((function(){return function(){var t=e.data;E.d("#chart").remove();var r=E.d(".plot-container").append("svg").attr("width",400).attr("height",375).attr("id","chart");r.selectAll("circle").data(t).enter().append("svg:circle").attr("cx",(function(e){return e[0]/130*300})).attr("transform","translate(50,385)").attr("cy",(function(e){return 337.5-e[1]/5e3*337.5})).attr("transform","translate(50,10)").attr("r",4).attr("fill",(function(e){return y(e[2])})).append("svg:title").text((function(e){return e[2]+": ("+e[0]+","+e[1]+")"}));var n=E.c().domain([0,130]).range([0,300]),a=E.a(n),i=E.c().domain([0,5e3]).range([337.5,0]),l=E.b(i);r.append("g").attr("transform","translate(50,10)").call(l),r.append("g").attr("transform","translate(50,347.5)").call(a),r.append("text").attr("class","x label").attr("text-anchor","end").attr("x",400).attr("y",345).text("# bars"),r.append("text").attr("class","y label").attr("text-anchor","end").attr("y",10).attr("transform","rotate(-90)").text("# compares")}()})),a.a.createElement(a.a.Fragment,null)}))),B=(r(39),function(){return Object(n.useEffect)((function(){return function(){E.d("#legend").remove();var e=E.d(".legend-container").append("svg").attr("width",100).attr("height",120).attr("id","legend");C(e,10,"bSort"),C(e,30,"iSort"),C(e,50,"hSort"),C(e,70,"qSort"),C(e,90,"mSort"),C(e,110,"shuffle")}()}),[]),a.a.createElement(a.a.Fragment,null)});function C(e,t,r){e.append("circle").attr("cx",10).attr("cy",t).attr("r",6).style("fill",y(r)),e.append("text").attr("x",20).attr("y",t).text(r).attr("alignment-baseline","middle")}var N=function(e){Object(o.a)(r,e);var t=Object(c.a)(r);function r(){var e;Object(s.a)(this,r);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={numBars:50,barArray:g(50),currentlyRunning:!1,speed:100,runtimes:[]},e}return Object(u.a)(r,[{key:"handleNumBarsChange",value:function(){var e=parseInt(document.getElementById("barSlider").value);document.getElementById("barSliderDisplay").innerHTML="# Bars: "+e,this.setState({numBars:e,barArray:g(e),currentlyRunning:!1})}},{key:"handleSpeedChange",value:function(){var e=parseInt(document.getElementById("speedSlider").value);document.getElementById("speedSliderDisplay").innerHTML="Speed: "+e/1e3+"s",this.setState({speed:e})}},{key:"handleStop",value:function(){this.setState({currentlyRunning:!1}),this.setColor(0)}},{key:"reset",value:function(e){var t=this.state.barArray.slice();e>=t.length||(t[e][1]=0,this.setState({barArray:t}))}},{key:"swap",value:function(e,t,r){var n=this,a=this.state.barArray.slice(),i=a[e];a[e]=a[t],a[t]=i,a[e][1]=2,a[t][1]=2,this.setState({barArray:a}),r?setTimeout((function(){n.reset(e),n.reset(t)}),this.state.speed):e!==t&&setTimeout((function(){n.reset(e)}),this.state.speed)}},{key:"setOneBar",value:function(e,t){var r=this.state.barArray.slice();r[e][1]=t,this.setState({barArray:r})}},{key:"setColor",value:function(e){for(var t=this.state.barArray.slice(),r=0;r<t.length;r++)t[r][1]=e;this.setState({barArray:t})}},{key:"setActive",value:function(e,t,r){for(var n=this.state.barArray.slice(),a=0;a<n.length;a++)n[a][1]=0;for(var i=e;i<=t;i++)n[i][1]=1;r&&(n[t][1]=3),this.setState({barArray:n})}},{key:"applyAlgorithm",value:function(e){if(!this.state.currentlyRunning){var t=this.state.barArray.slice();if("instantShuffle"!==e&&"shuffle"!==e)b(t)?this.setColor(4):this.handleSequence(m[v.get(e)](t),e);else{this.setColor(0);var r=h(t);"shuffle"===e?this.handleSequence(r,"shuffle"):this.setState({barArray:t})}}}},{key:"handleSequence",value:function(e,t){var r=this,n=e.length,a=this.state.runtimes.slice();a.push([this.state.numBars,n,t]),this.setState({runtimes:a}),document.getElementById(t).style.backgroundColor=y(t),document.getElementById(t).style.color="white",this.setState({currentlyRunning:!0}),setTimeout((function(){return r.handleSequenceLoop(0,n,e,t)}),100)}},{key:"handleSequenceLoop",value:function(e,t,r,n){var a=this;if(!this.state.currentlyRunning)return document.getElementById(n).style.backgroundColor="",void(document.getElementById(n).style.color="");if(e>=t)return this.setState({currentlyRunning:!1}),b(this.state.barArray)?setTimeout((function(){return a.setColor(4)}),this.state.speed):setTimeout((function(){return a.setColor(0)}),this.state.speed),document.getElementById(n).style.backgroundColor="",void(document.getElementById(n).style.color="");if(2===r[e].length)this.swap(r[e][0],r[e][1],!0);else if(3===r[e].length)this.swap(r[e][0],r[e][1],!1),this.setOneBar(r[e][2],4);else if(4===r[e].length)this.setActive(r[e][2],r[e][3],!0),this.swap(r[e][0],r[e][1],!0);else if(5===r[e].length){this.setActive(r[e][1],r[e][2],!1);var i=r[e][0];i[r[e][3]][1]=2,i[r[e][4]][1]=2,this.setState({barArray:i})}setTimeout((function(){return a.handleSequenceLoop(e+1,t,r,n)}),this.state.speed)}},{key:"getSample",value:function(e){if(!this.state.currentlyRunning){var t=this.state.runtimes.slice();(function(e){var t=[];if(void 0!==v.get(e))S(e,5,128,-1).forEach((function(e){return t.push(e)}));else for(var r=0;r<6;r++){S(f[r],10,120,10).forEach((function(e){return t.push(e)}))}return t})(e).forEach((function(e){return t.push(e)})),this.setState({runtimes:t})}}},{key:"resetRuntimes",value:function(){this.state.currentlyRunning||this.setState({runtimes:[]})}},{key:"render",value:function(){for(var e=this,t=new Array(5),r=function(r){t[r]=a.a.createElement("div",{className:"menubar-cell",key:r},a.a.createElement("div",{className:"menubar-cell-top",id:f[r],onClick:function(){return e.applyAlgorithm(f[r])}},p[r]),a.a.createElement("div",{className:"menubar-cell-bottom",onClick:function(){return e.getSample(f[r])}},"Sample"))},n=0;n<5;n++)r(n);var i=a.a.createElement("div",{id:"otherButtonsContainer"},a.a.createElement("div",{className:"other-button",id:"shuffle",onClick:function(){return e.applyAlgorithm("shuffle")}},"Shuffle"),a.a.createElement("br",null),a.a.createElement("div",{className:"other-button",id:"instantShuffle",onClick:function(){return e.applyAlgorithm("instantShuffle")}},"Instant Shuffle"),a.a.createElement("br",null),a.a.createElement("div",{className:"other-button",onClick:function(){return e.handleStop()}},"Stop")),l=a.a.createElement("div",{id:"sliderContainer"},a.a.createElement("input",{type:"range",min:"5",max:"128",defaultValue:"50",name:"barSlider",id:"barSlider",onInput:function(){return e.handleNumBarsChange()}}),a.a.createElement("br",null),a.a.createElement("label",{htmlFor:"barSlider",id:"barSliderDisplay"},"# Bars: 50"),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("input",{type:"range",min:"10",max:"700",defaultValue:"100",step:"10",name:"speedSlider",id:"speedSlider",onInput:function(){return e.handleSpeedChange()}}),a.a.createElement("br",null),a.a.createElement("label",{htmlFor:"speedSlider",id:"speedSliderDisplay"},"Speed: ",this.state.speed/1e3,"s"),a.a.createElement("br",null));return a.a.createElement("div",{id:"Bundle"},a.a.createElement("div",{className:"bundle-top"},a.a.createElement("div",{id:"menuBar"},t),a.a.createElement("div",{className:"other-buttons-super-container"},i),a.a.createElement("div",{className:"slider-super-container"},l)),a.a.createElement("div",{className:"bundle-bottom"},a.a.createElement("div",{className:"bar-container"},a.a.createElement(k,{data:this.state.barArray})),a.a.createElement("div",{className:"bundle-bottom-right"},a.a.createElement("div",{className:"plot-container"},a.a.createElement(A,{data:this.state.runtimes})),a.a.createElement("div",{className:"legend-container"},a.a.createElement("div",{className:"legend-button-container"},a.a.createElement("div",{className:"legend-button",id:"sampleButton",onClick:function(){return e.getSample("all")}},"Sample"),a.a.createElement("div",{className:"legend-button",id:"resetButton",onClick:function(){return e.resetRuntimes()}},"Reset")),a.a.createElement(B,null)))))}}]),r}(a.a.Component);l.a.render(a.a.createElement(N,null),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.edd85b42.chunk.js.map