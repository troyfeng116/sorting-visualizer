(this["webpackJsonpsorting-visualizer"]=this["webpackJsonpsorting-visualizer"]||[]).push([[0],{30:function(t,e,r){t.exports=r(36)},35:function(t,e,r){},36:function(t,e,r){"use strict";r.r(e);var n=r(0),a=r.n(n),i=r(14),l=r.n(i),u=(r(35),r(15)),s=r(16),o=r(18),c=r(17);function h(t){for(var e=[],r=t.length-1;r>0;r--){var n=Math.floor(Math.random()*(r+1)),a=t[r];t[r]=t[n],t[n]=a,e.push([r,n])}return e}function f(t,e,r,n){var a=e,i=2*e+1,l=2*e+2;if(i<r&&t[i][0]>t[a][0]&&(a=i),l<r&&t[l][0]>t[a][0]&&(a=l),a!==e){var u=t[e];t[e]=t[a],t[a]=u,n.push([e,a]),f(t,a,r,n)}}var d=["bSort","iSort","hSort","qSort","mSort","shuffle"],m=[function(t){for(var e=[],r=t.length-1;r>0;r--)for(var n=0;n<r;n++){if(t[n][0]>t[n+1][0]){var a=t[n];t[n]=t[n+1],t[n+1]=a,n===r-1?e.push([n,n+1,n+1]):e.push([n,n+1])}n===r-1&&e.push([n+1,n+1,n+1])}return e},function(t){for(var e=[],r=0;r<t.length;r++)for(var n=t[r],a=r-1;a>=0&&t[a][0]>n[0];)t[a+1]=t[a],t[a]=n,e.push([a,a+1]),a--;return e},function(t){for(var e=[],r=t.length,n=r-1;n>=0;n--)f(t,n,r,e);for(var a=r-1;a>0;a--){var i=t[0];t[0]=t[a],t[a]=i,e.push([0,a,a]),f(t,0,a,e)}return e},function(t){var e=[];return function t(e,r,n,a){if(r>=n)return;for(var i=e[n],l=r,u=r;u<n;u++)if(e[u][0]<i[0]){var s=e[u];e[u]=e[l],e[l]=s,a.push([u,l,r,n]),l++}e[n]=e[l],e[l]=i,a.push([l,n,r,n]),t(e,r,l-1,a),t(e,l+1,n,a)}(t,0,t.length-1,e),e},function(t){var e=[];return function t(e,r,n,a){if(r>=n)return;var i=Math.floor((r+n)/2);t(e,r,i,a),t(e,i+1,n,a),function(t,e,r,n){var a=Math.floor((e+r)/2),i=e,l=a+1;for(;i<=a&&l<=r;)if(t[i][0]<=t[l][0])i++,n.push([t.slice(),e,r,i,l]);else{for(var u=t[l],s=l;s!==i;)t[s]=t[s-1],s--;t[i]=u,i++,a++,++l<=r?n.push([t.slice(),e,r,i,l]):n.push([t.slice(),e,r,i,l-1])}}(e,r,n,a)}(t,0,t.length-1,e),e},h],p=["Bubble Sort","Insertion Sort","Heap Sort","Quick Sort","Merge Sort"],v=new Map;function g(t){for(var e=[],r=1;r<=t;r++)e.push([r,0]);return e}function y(t){for(var e=0;e<t.length-1;e++)if(t[e][0]>t[e+1][0])return!1;return!0}function S(t){switch(t){case"bSort":return"rgb(255,0,0)";case"iSort":return"rgb(0,220,0)";case"hSort":return"rgb(0,150,255)";case"qSort":return"rgb(255,120,0)";case"mSort":return"rgb(220,0,220)";case"shuffle":return"rgb(15,15,15)"}return"black"}function b(t,e,r,n){for(var a=[],i=e;i<=r;i+=n){var l=g(i);h(l);var u=m[v.get(t)](l);a.push([i,u.length,t])}return a}d.map((function(t,e){return v.set(t,e)}));var E=r(1);function A(t){return Object(n.useEffect)((function(){return function(){var e=t.data;E.d("#barContainer").remove(),E.d("Body").append("svg").attr("width","50%").attr("height","60%").attr("id","barContainer").selectAll("rect").data(e).enter().append("rect").attr("x",(function(t,r){return 100*r/e.length+"%"})).attr("y",(function(t,r){return 100-100/e.length*t[0]+"%"})).attr("width",55/e.length+"%").attr("height",(function(t,r){return 100/e.length*t[0]+"%"})).attr("fill",(function(t,e){return 0===(r=t[1])?"rgb(60,60,120)":1===r?"rgb(100,100,255)":2===r?"red":3===r?"blue":"rgb(80,210,80)";var r}))}()})),a.a.createElement("div",null)}var k=function(t){return Object(n.useEffect)((function(){return function(){var e=t.data;E.d("#chart").remove();var r=E.d("body").append("svg").attr("width",400).attr("height",400).attr("id","chart");r.selectAll("circle").data(e).enter().append("svg:circle").attr("cx",(function(t){return t[0]/130*300})).attr("transform","translate(50,410)").attr("cy",(function(t){return 320-t[1]/5e3*320})).attr("transform","translate(50,10)").attr("r",4).attr("fill",(function(t){return S(t[2])})).append("svg:title").text((function(t){return t[2]+": ("+t[0]+","+t[1]+")"}));var n=E.c().domain([0,130]).range([0,300]),a=E.a(n),i=E.c().domain([0,5e3]).range([320,0]),l=E.b(i);r.append("g").attr("transform","translate(50,10)").call(l),r.append("g").attr("transform","translate(50,330)").call(a),r.append("text").attr("class","x label").attr("text-anchor","end").attr("x",400).attr("y",390).text("# bars"),r.append("text").attr("class","y label").attr("text-anchor","end").attr("y",10).attr("transform","rotate(-90)").text("# compares")}()})),null},B=function(){E.d("#legend").remove();var t=E.d("body").append("svg").attr("width",100).attr("height",120).attr("id","legend");return C(t,10,"bSort"),C(t,30,"iSort"),C(t,50,"hSort"),C(t,70,"qSort"),C(t,90,"mSort"),C(t,110,"shuffle"),a.a.createElement("div",null)};function C(t,e,r){t.append("circle").attr("cx",10).attr("cy",e).attr("r",6).style("fill",S(r)),t.append("text").attr("x",20).attr("y",e).text(r).attr("alignment-baseline","middle")}var x=function(t){Object(o.a)(r,t);var e=Object(c.a)(r);function r(){var t;Object(u.a)(this,r);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(t=e.call.apply(e,[this].concat(a))).state={numBars:50,barArray:g(50),currentlyRunning:!1,speed:100,runtimes:[]},t}return Object(s.a)(r,[{key:"handleNumBarsChange",value:function(){var t=parseInt(document.getElementById("barSlider").value);document.getElementById("barSliderDisplay").innerHTML="# BARS: "+t,this.setState({numBars:t,barArray:g(t),currentlyRunning:!1})}},{key:"handleSpeedChange",value:function(){var t=parseInt(document.getElementById("speedSlider").value);document.getElementById("speedSliderDisplay").innerHTML="SPEED: "+t/1e3+"s",this.setState({speed:t})}},{key:"handleStop",value:function(){this.setState({currentlyRunning:!1}),this.setColor(0)}},{key:"reset",value:function(t){var e=this.state.barArray.slice();t>=e.length||(e[t][1]=0,this.setState({barArray:e}))}},{key:"swap",value:function(t,e,r){var n=this,a=this.state.barArray.slice(),i=a[t];a[t]=a[e],a[e]=i,a[t][1]=2,a[e][1]=2,this.setState({barArray:a}),r?setTimeout((function(){n.reset(t),n.reset(e)}),this.state.speed):t!==e&&setTimeout((function(){n.reset(t)}),this.state.speed)}},{key:"setOneBar",value:function(t,e){var r=this.state.barArray.slice();r[t][1]=e,this.setState({barArray:r})}},{key:"setColor",value:function(t){for(var e=this.state.barArray.slice(),r=0;r<e.length;r++)e[r][1]=t;this.setState({barArray:e})}},{key:"setActive",value:function(t,e,r){for(var n=this.state.barArray.slice(),a=0;a<n.length;a++)n[a][1]=0;for(var i=t;i<=e;i++)n[i][1]=1;r&&(n[e][1]=3),this.setState({barArray:n})}},{key:"applyAlgorithm",value:function(t){if(!this.state.currentlyRunning){var e=this.state.barArray.slice();if("instantShuffle"!==t&&"shuffle"!==t)y(e)?this.setColor(4):this.handleSequence(m[v.get(t)](e),t);else{this.setColor(0);var r=h(e);"shuffle"===t?this.handleSequence(r,"shuffle"):this.setState({barArray:e})}}}},{key:"handleSequence",value:function(t,e){var r=this,n=t.length,a=this.state.runtimes.slice();a.push([this.state.numBars,n,e]),this.setState({runtimes:a}),document.getElementById(e).style.backgroundColor=S(e),document.getElementById(e).style.color="white",this.setState({currentlyRunning:!0}),setTimeout((function(){return r.handleSequenceLoop(0,n,t,e)}),100)}},{key:"handleSequenceLoop",value:function(t,e,r,n){var a=this;if(!this.state.currentlyRunning)return document.getElementById(n).style.backgroundColor="",void(document.getElementById(n).style.color="");if(t>=e)return this.setState({currentlyRunning:!1}),y(this.state.barArray)?setTimeout((function(){return a.setColor(4)}),this.state.speed):setTimeout((function(){return a.setColor(0)}),this.state.speed),document.getElementById(n).style.backgroundColor="",void(document.getElementById(n).style.color="");if(2===r[t].length)this.swap(r[t][0],r[t][1],!0);else if(3===r[t].length)this.swap(r[t][0],r[t][1],!1),this.setOneBar(r[t][2],4);else if(4===r[t].length)this.setActive(r[t][2],r[t][3],!0),this.swap(r[t][0],r[t][1],!0);else if(5===r[t].length){this.setActive(r[t][1],r[t][2],!1);var i=r[t][0];i[r[t][3]][1]=2,i[r[t][4]][1]=2,this.setState({barArray:i})}setTimeout((function(){return a.handleSequenceLoop(t+1,e,r,n)}),this.state.speed)}},{key:"getSample",value:function(t){var e=this.state.runtimes;(function(t){var e=[];if(void 0!==v.get(t))b(t,5,128,5).forEach((function(t){return e.push(t)}));else for(var r=0;r<6;r++){b(d[r],10,120,10).forEach((function(t){return e.push(t)}))}return e})(t).forEach((function(t){return e.push(t)})),this.setState({runtimes:e})}},{key:"resetRuntimes",value:function(){this.setState({runtimes:[]})}},{key:"render",value:function(){var t=this,e=d.map((function(e,r){return r<5?a.a.createElement("li",null,a.a.createElement("div",{id:e,onClick:function(){return t.applyAlgorithm(e)}},p[r])):null})),r=a.a.createElement("ul",{id:"menuBar"},e),n=d.map((function(e,r){return r<5?a.a.createElement("li",null,a.a.createElement("div",{onClick:function(){return t.getSample(e)}},"Sample")):null})),i=a.a.createElement("ul",{id:"sampleBar"},n),l=a.a.createElement("div",{id:"otherButtonsContainer"},a.a.createElement("div",{id:"shuffle",onClick:function(){return t.applyAlgorithm("shuffle")}},"Shuffle"),a.a.createElement("br",null),a.a.createElement("div",{id:"instantShuffle",onClick:function(){return t.applyAlgorithm("instantShuffle")}},"Instant Shuffle"),a.a.createElement("br",null),a.a.createElement("div",{onClick:function(){return t.handleStop()}},"Stop")),u=a.a.createElement("div",{id:"sliderContainer"},a.a.createElement("input",{type:"range",min:"5",max:"128",defaultValue:"50",name:"barSlider",id:"barSlider",onInput:function(){return t.handleNumBarsChange()}}),a.a.createElement("br",null),a.a.createElement("label",{htmlFor:"barSlider",id:"barSliderDisplay"},"# BARS: 50"),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("input",{type:"range",min:"10",max:"700",defaultValue:"100",step:"10",name:"speedSlider",id:"speedSlider",onInput:function(){return t.handleSpeedChange()}}),a.a.createElement("br",null),a.a.createElement("label",{htmlFor:"speedSlider",id:"speedSliderDisplay"},"SPEED: 0.1 s"),a.a.createElement("br",null)),s=a.a.createElement(A,{data:this.state.barArray}),o=a.a.createElement(k,{data:this.state.runtimes}),c=a.a.createElement("div",{id:"legendContainer"},a.a.createElement(B,null),a.a.createElement("div",{id:"sampleButton",onClick:function(){return t.getSample("all")}},"Sample"),a.a.createElement("div",{id:"resetButton",onClick:function(){return t.resetRuntimes()}},"Reset"));return a.a.createElement("div",{id:"Bundle"},r,i,l,u,s,o,c)}}]),r}(a.a.Component);l.a.render(a.a.createElement(x,null),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.41c0f4c6.chunk.js.map