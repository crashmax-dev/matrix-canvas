!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(this,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e),n.d(e,"Matrix",(function(){return r}));var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)};function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var r=function(){function t(e){var n,i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._running=!1,this._traces=[],this._splashes={interval:200,enable:!1,colors:[],texts:[],size:40},this._target=e.target,this._canvas=document.createElement("canvas"),this._ctx=this._canvas.getContext("2d"),this._target.appendChild(this._canvas),this._font=new FontFace(e.font.family,"url(".concat(e.font.file,")")),this._fontSize=e.font.size,this._tracesCount=e.tracesCount||300,this._autoresize=null===(n=e.autoresize)||void 0===n||n,this._symbols=e.symbols,this._splashes=Object.assign(Object.assign({},this._splashes),e.splashes),this._colors=e.font.colors||["#225400","#66FF00","#155400","#395410","#7FFF00","#005400","#2A5400","#3FFF00","#00FF00","#ADFF2F"],this._autoresize&&window.addEventListener("resize",(function(){i.size()})),this.size()}var e,n,r;return e=t,(n=[{key:"inRunning",get:function(){return this._running}},{key:"start",value:function(){var t=this;this._running||this._font.load().then((function(){t._running=!0,t.render(),t.startSplash()})).catch((function(){throw new Error("Failed loading font!")}))}},{key:"stop",value:function(){this._running=!1,this.clear()}},{key:"clear",value:function(){this._ctx&&(this._traces=[],this._ctx.save(),this._ctx.globalCompositeOperation="copy",this._ctx.lineTo(0,0),this._ctx.stroke(),this._ctx.restore(),this.stopSplash())}},{key:"pause",value:function(){this._running=!this._running,this._running&&this.render()}},{key:"size",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.width,n=void 0===e?this._target.clientWidth:e,i=t.height,s=void 0===i?this._target.clientHeight:i;this._canvas.width=n,this._canvas.height=s}},{key:"initTraces",value:function(){for(;this._traces.length!==this._tracesCount;)this._traces.push(this.randomInt(0,1e3))}},{key:"randomInt",value:function(t,e){return Math.floor(t+Math.random()*(e+1-t))}},{key:"randomColor",value:function(){return this._colors[this.randomInt(0,this._colors.length-1)]}},{key:"randomSplash",value:function(){return this._splashes.texts[this.randomInt(0,this._splashes.texts.length-1)]}},{key:"startSplash",value:function(){var t=this;this._splashInterval||(this._splashInterval=setInterval((function(){t.renderSplash()}),this._splashes.interval))}},{key:"stopSplash",value:function(){this._splashInterval&&(clearInterval(this._splashInterval),this._splashInterval=null)}},{key:"renderSplash",value:function(){this._ctx&&this._running&&(this._ctx.save(),this._ctx.fillStyle=this.randomColor(),this._ctx.font="".concat(this._splashes.size,"pt ").concat(this._font.family),this._ctx.rotate(this.randomInt(0,360)),this._ctx.fillText(this.randomSplash(),this.randomInt(200,this._canvas.width-200),this.randomInt(200,this._canvas.height-200)),this._ctx.restore())}},{key:"render",value:function(){var t=this;this._ctx&&this._running&&(this._traces.length!==this._tracesCount&&this.initTraces(),i((function(){return t.render()})),this._ctx.fillStyle="rgba(0, 0, 0, .05)",this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height),this._ctx.fillStyle=this.randomColor(),this._ctx.font="".concat(this._fontSize,"pt ").concat(this._font.family),this._traces.map((function(e,n){var i,s=(null===(i=t._symbols)||void 0===i?void 0:i.call(t))||String.fromCharCode(100+28*Math.random()),r=10*n+10;t._ctx.fillText(s,r,e),e>100+1e4*Math.random()?t._traces[n]=0:t._traces[n]=e+10})))}}])&&s(e.prototype,n),r&&s(e,r),t}()}])}));