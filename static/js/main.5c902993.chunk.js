(this["webpackJsonpsorting-visualizer"]=this["webpackJsonpsorting-visualizer"]||[]).push([[0],{13:function(e,t,r){},7:function(e,t,r){e.exports=r(8)},8:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r(2),i=r(4),l=r(3),u=r(0),o=r.n(u),s=r(6),c=r.n(s),h=(r(13),100),f=!1,d=function(e){Object(i.a)(r,e);var t=Object(l.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){return o.a.createElement("div",{style:this.props.style},this.props.val)}}]),r}(o.a.Component),v=function(e){Object(i.a)(r,e);var t=Object(l.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"renderBar",value:function(e,t){return o.a.createElement(d,{val:e,style:t})}},{key:"render",value:function(){var e=this,t=this.props.barArray,r=this.props.numBars,n=t.map((function(t,n){var a,i={width:85/r+"%",height:t[0]/r*100+"%",left:100*n/r+"%",backgroundColor:(a=t[1],0===a?"rgb(60,60,120)":1===a?"rgb(100,100,255)":2===a?"red":3===a?"blue":"rgb(80,210,80)")};return r<=40?e.renderBar(t[0],i):e.renderBar("",i)}));return o.a.createElement("div",{id:"barContainer"},n)}}]),r}(o.a.Component),m=function(e){Object(i.a)(r,e);var t=Object(l.a)(r);function r(e){var a;return Object(n.a)(this,r),(a=t.call(this,e)).state={numBars:30,barArray:b(30)},a}return Object(a.a)(r,[{key:"handleNumBarsChange",value:function(){var e=document.getElementById("barSlider").value;document.getElementById("barSliderDisplay").innerHTML="# BARS: "+e,this.setState({numBars:e,barArray:b(e)})}},{key:"handleSpeedChange",value:function(){h=document.getElementById("speedSlider").value,document.getElementById("speedSliderDisplay").innerHTML="SPEED: "+h/1e3+"s"}},{key:"handleStop",value:function(){f=!1,this.setColor(0)}},{key:"reset",value:function(e,t){var r=this.state.barArray.slice();r[e][1]=0,r[t][1]=0,this.setState({barArray:r})}},{key:"swap",value:function(e,t){var r=this,n=this.state.barArray.slice(),a=n[e];n[e]=n[t],n[t]=a,n[e][1]=2,n[t][1]=2,this.setState({barArray:n}),setTimeout((function(){return r.reset(e,t)}),h)}},{key:"setColor",value:function(e){for(var t=this.state.barArray.slice(),r=0;r<t.length;r++)t[r][1]=e;this.setState({barArray:t})}},{key:"setActive",value:function(e,t,r){for(var n=this.state.barArray.slice(),a=0;a<n.length;a++)n[a][1]=0;for(var i=e;i<=t;i++)n[i][1]=1;r&&(n[t][1]=3),this.setState({barArray:n})}},{key:"shuffle",value:function(){f||(this.setColor(0),f=!0,this.shuffleLoop(this.state.numBars-1))}},{key:"shuffleLoop",value:function(e){var t=this;if(f)if(e<1)f=!1;else{var r=Math.floor(Math.random()*(e+1));this.swap(e,r),setTimeout((function(){return t.shuffleLoop(e-1)}),h)}}},{key:"bubbleSort",value:function(){if(!f){var e=this.state.barArray.slice();p(e)?this.setColor(4):this.handleSequence(function(e){for(var t=[],r=e.length-1;r>0;r--)for(var n=0;n<r;n++)if(e[n][0]>e[n+1][0]){var a=e[n];e[n]=e[n+1],e[n+1]=a,t.push([n,n+1])}return t}(e))}}},{key:"insertionSort",value:function(){if(!f){var e=this.state.barArray.slice();p(e)?this.setColor(4):this.handleSequence(function(e){for(var t=[],r=0;r<e.length;r++)for(var n=e[r],a=r-1;a>=0&&e[a][0]>n[0];)e[a+1]=e[a],e[a]=n,t.push([a,a+1]),a--;return t}(e))}}},{key:"quickSort",value:function(){if(!f){var e=this.state.barArray.slice();p(e)?this.setColor(4):this.handleSequence(function(e){var t=[];return function e(t,r,n,a){if(r>=n)return;for(var i=t[n],l=r,u=r;u<n;u++)if(t[u][0]<i[0]){var o=t[u];t[u]=t[l],t[l]=o,u!==l&&a.push([u,l,r,n]),l++}t[n]=t[l],t[l]=i,l!==n&&a.push([l,n,r,n]);e(t,r,l-1,a),e(t,l+1,n,a)}(e,0,e.length-1,t),t}(e))}}},{key:"mergeSort",value:function(){if(!f){var e=this.state.barArray.slice();p(e)?this.setColor(4):this.handleSequence(function(e){var t=[];return function e(t,r,n,a){if(r>=n)return;var i=Math.floor((r+n)/2);e(t,r,i,a),e(t,i+1,n,a),function(e,t,r,n){var a=Math.floor((t+r)/2),i=t,l=a+1;for(;i<=a&&l<=r;)if(e[i][0]<=e[l][0])i++,n.push([e.slice(),t,r,i,l]);else{for(var u=e[l],o=l;o!==i;)e[o]=e[o-1],o--;e[i]=u,n.push([e.slice(),t,r,i,l]),i++,l++,a++}}(t,r,n,a)}(e,0,e.length-1,t),t}(e))}}},{key:"handleSequence",value:function(e){var t=e.length;f=!0,this.handleSequenceLoop(0,t,e)}},{key:"handleSequenceLoop",value:function(e,t,r){var n=this;if(f)if(e>=t)f=!1;else{if(2===r[e].length||4===r[e].length)4===r[e].length&&this.setActive(r[e][2],r[e][3],!0),this.swap(r[e][0],r[e][1]);else if(5===r[e].length){this.setActive(r[e][1],r[e][2],!1);var a=r[e][0];a[r[e][3]][1]=2,a[r[e][4]][1]=2,this.setState({barArray:a})}setTimeout((function(){return n.handleSequenceLoop(e+1,t,r)}),h),p(this.state.barArray)&&setTimeout((function(){return n.setColor(4)}),h)}}},{key:"render",value:function(){var e=this,t=o.a.createElement("ul",{id:"menuBar"},o.a.createElement("li",null,o.a.createElement("button",{onClick:function(){return e.bubbleSort()}},"Bubble Sort")),o.a.createElement("li",null,"Selection Sort"),o.a.createElement("li",null,o.a.createElement("button",{onClick:function(){return e.insertionSort()}},"Insertion Sort")),o.a.createElement("li",null,o.a.createElement("button",{onClick:function(){return e.mergeSort()}},"Merge Sort")),o.a.createElement("li",null,o.a.createElement("button",{onClick:function(){return e.quickSort()}},"Quick Sort")),o.a.createElement("li",null,o.a.createElement("button",{onClick:function(){return e.shuffle()}},"Shuffle")),o.a.createElement("li",null,o.a.createElement("button",{onClick:function(){return e.handleStop()}},"Stop"))),r=o.a.createElement("div",{id:"sliderContainer"},o.a.createElement("input",{type:"range",min:"5",max:"75",defaultValue:"30",name:"barSlider",id:"barSlider",onInput:function(){return e.handleNumBarsChange()}}),o.a.createElement("br",null),o.a.createElement("label",{for:"barSlider",id:"barSliderDisplay"},"# BARS: 30"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("input",{type:"range",min:"10",max:"700",defaultValue:"100",step:"10",name:"speedSlider",id:"speedSlider",onInput:function(){return e.handleSpeedChange()}}),o.a.createElement("br",null),o.a.createElement("label",{for:"speedSlider",id:"speedSliderDisplay"},"SPEED: 0.1 s"),o.a.createElement("br",null)),n=o.a.createElement(v,{numBars:this.state.numBars,barArray:this.state.barArray});return o.a.createElement("div",{id:"menuBarContainer"},t,r,n,o.a.createElement("div",{id:"test"},"TEST"))}}]),r}(o.a.Component);function b(e){for(var t=[],r=1;r<=e;r++)t.push([r,0]);return t}function p(e){for(var t=0;t<e.length-1;t++)if(e[t][0]>e[t+1][0])return!1;return!0}c.a.render(o.a.createElement(m,null),document.getElementById("root"))}},[[7,1,2]]]);
//# sourceMappingURL=main.5c902993.chunk.js.map