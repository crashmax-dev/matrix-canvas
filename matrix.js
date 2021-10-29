!function(t,i){if("object"==typeof exports&&"object"==typeof module)module.exports=i();else if("function"==typeof define&&define.amd)define([],i);else{var s=i();for(var e in s)("object"==typeof exports?exports:t)[e]=s[e]}}(this,(function(){return(()=>{"use strict";var t={665:(t,i,s)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Entity=void 0;var e=s(335);i.Entity=class{constructor(t,i){this.options={files:[],enabled:!0,size:32,rotate:[-30,30],opacity:.5,speed:30,count:15},this.flyingEntities=[],this.matrix=t,this.options=Object.assign(Object.assign({},this.options),i)}randomImage(){var t=new Image(this.options.size),i=this.options.files[(0,e.randomInt)(0,this.options.files.length-1)];return t.src=i,t.style.userSelect="none",t.style.position="absolute",t}start(){this.interval||(this.interval=setInterval((()=>{this.render()}),this.options.speed))}stop(){this.interval&&(clearInterval(this.interval),this.interval=null,this.clear())}clear(){this.flyingEntities.forEach((t=>t.img.remove())),this.flyingEntities=[]}createEntity(){for(;this.flyingEntities.length!==this.options.count;){var t=this.randomImage();document.body.appendChild(t),this.flyingEntities.push({dx:0,x:Math.random()*(this.matrix.canvas.width-this.options.size),y:Math.random()>.8?-this.options.size:Math.random()*this.matrix.canvas.height,am:20*Math.random(),stepX:.02+Math.random()/10,stepY:.7+Math.random(),rotate:(0,e.randomInt)(this.options.rotate[0],this.options.rotate[1]),img:t})}}render(){if(this.matrix.ctx&&this.options.enabled&&this.options.files.length){this.createEntity();for(var t=this.flyingEntities,i=0;i<t.length;++i){Number(t[i].img.style.width)!==this.options.size&&(t[i].img.style.width=this.options.size/window.devicePixelRatio+"px");var s=this.options.opacity.toString();t[i].img.style.opacity!==s&&(t[i].img.style.opacity=s),t[i].y+=t[i].stepY,t[i].y>this.matrix.canvas.height+this.options.size&&(t[i].rotate=(0,e.randomInt)(this.options.rotate[0],this.options.rotate[1]),t[i].x=Math.random()*(this.matrix.canvas.width-t[i].am-this.options.size),t[i].y=-this.options.size,t[i].stepX=.02+Math.random()/10,t[i].stepY=.7+Math.random()),t[i].dx+=t[i].stepX,t[i].img.style.top=t[i].y+"px",t[i].img.style.left=t[i].x+t[i].am*Math.sin(t[i].dx)+"px",(this.options.rotate[0]||this.options.rotate[1])&&(t[i].img.style.transform="rotate("+(t[i].rotate+30*Math.sin(t[i].dx))+"deg)")}}}}},698:(t,i,s)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Matrix=void 0;var e=s(335),n=s(665),a=s(231);i.Matrix=class{constructor(t,i){var s;this.running=!1,this.traces=[],this.target=t,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.target.appendChild(this.canvas),this.setSize(),this.entity=new n.Entity(this,i.entity),this.splash=new a.Splash(this,i.splash),this.font=new FontFace(i.font.family,"url(".concat(i.font.file,")")),this.fontSize=i.font.size,this.tracesCount=Math.round(window.innerWidth/10),this.autoresize=null===(s=i.autoresize)||void 0===s||s,this.symbols=i.symbols,this.colors=i.font.colors||["#225400","#66FF00","#155400","#395410","#7FFF00","#005400","#2A5400","#3FFF00","#00FF00","#ADFF2F"],this.autoresize&&(this.handleResize=this.handleResize.bind(this),window.addEventListener("resize",this.handleResize,!1))}get isRunning(){return this.running}start(){this.running||this.font.load().then((()=>{this.running=!0,this.render(),this.splash.start(),this.entity.start()})).catch((()=>{throw new Error("Failed loading `font.file`")}))}stop(){this.running=!1,window.removeEventListener("resize",this.handleResize,!1),this.clear()}clear(){this.ctx&&(this.traces=[],this.ctx.save(),this.ctx.globalCompositeOperation="copy",this.ctx.lineTo(0,0),this.ctx.stroke(),this.ctx.restore(),this.isRunning?this.entity.clear():(this.entity.stop(),this.splash.stop()))}pause(){this.running=!this.running,this.running&&this.render()}randomColor(){return this.colors[(0,e.randomInt)(0,this.colors.length-1)]}handleResize(){this.setSize(),this.clear()}setOptions(t){t.entity&&(Object.assign(this.entity.options,t.entity),delete t.entity),t.splash&&(Object.assign(this.splash.options,t.splash),delete t.splash),Object.assign(this,t)}setSize(){this.canvas.width=this.target.clientWidth,this.canvas.height=this.target.clientHeight}initTraces(){for(;this.traces.length!==this.tracesCount;)this.traces.push((0,e.randomInt)(0,window.innerHeight))}render(){this.ctx&&this.running&&(this.traces.length!==this.tracesCount&&this.initTraces(),window.requestAnimationFrame((()=>this.render())),this.ctx.fillStyle="rgba(0, 0, 0, .05)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle=this.randomColor(),this.ctx.font="".concat(this.fontSize,"pt ").concat(this.font.family),this.traces.map(((t,i)=>{var s,e=(null===(s=this.symbols)||void 0===s?void 0:s.call(this))||String.fromCharCode(100+28*Math.random()),n=i*this.fontSize+this.fontSize;this.ctx.fillText(e,n,t),t>100+1e4*Math.random()?this.traces[i]=0:this.traces[i]=t+10})))}}},231:(t,i,s)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.Splash=void 0;var e=s(335);i.Splash=class{constructor(t,i){this.options={interval:200,enabled:!1,colors:[],texts:[],size:40},this.isVisible=!0,this.matrix=t,this.options=Object.assign(Object.assign({},this.options),i)}randomSplash(){return this.options.texts[(0,e.randomInt)(0,this.options.texts.length-1)]}updateVisibleState(){this.isVisible="hidden"!==document.visibilityState}start(){this.interval||(this.interval=setInterval((()=>{this.updateVisibleState(),this.render()}),this.options.interval))}stop(){this.interval&&(clearInterval(this.interval),this.interval=null)}render(){this.isVisible&&this.matrix.ctx&&this.matrix.isRunning&&(this.matrix.ctx.save(),this.options.enabled&&(this.matrix.ctx.fillStyle=this.matrix.randomColor(),this.matrix.ctx.font="".concat(this.options.size/window.devicePixelRatio,"pt ").concat(this.matrix.font.family),this.matrix.ctx.rotate((0,e.randomInt)(0,360)),this.matrix.ctx.fillText(this.randomSplash(),(0,e.randomInt)(200,this.matrix.canvas.width-200),(0,e.randomInt)(200,this.matrix.canvas.height-200)),this.matrix.ctx.restore()))}}},335:(t,i,s)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.randomInt=void 0;var e=s(888);Object.defineProperty(i,"randomInt",{enumerable:!0,get:function(){return e.randomInt}})},888:(t,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.randomInt=void 0,i.randomInt=function(t,i){return Math.floor(t+Math.random()*(i+1-t))}}},i={};function s(e){var n=i[e];if(void 0!==n)return n.exports;var a=i[e]={exports:{}};return t[e](a,a.exports,s),a.exports}var e={};return(()=>{var t=e;Object.defineProperty(t,"__esModule",{value:!0}),t.Matrix=void 0;var i=s(698);t.Matrix=class{constructor(t,s){this._=new i.Matrix(t,s)}get isRunning(){return this._.isRunning}start(){this._.start()}stop(){this._.stop()}clear(){this._.clear()}pause(){this._.pause()}setOptions(t){this._.setOptions(t)}}})(),e})()}));