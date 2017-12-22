define(["jquery","lodash","pubSub"],function(t,n,i){var a=function(t){var e=this;if(!t)return!1;e.slider=e.$$(t.id),e.data=t.data,e.dataLength=e.data.length,e.re=null,e.animateTime=null,e.textArr=[],e.options={index:Number(t.index||0),auto:t.auto||!0,time:t.time?t.time:4e3,speed:t.speed?t.speed:40,effect:t.effect?t.effect:"Quint",direction:t.direction||"Lateral",isHidden:t.isHidden,nav:t.nav||"promo-nav",navEvent:t.navEvent?t.navEvent:"click",current:t.current?t.current:"active",isText:!!t.isText,text:t.text},console.log(e.options),e.init()};return a.prototype.constructor=a,a.prototype={$$:function(t){return document.getElementById(t)},addEvent:function(t,e,n){document.addEventListener?t.addEventListener(e,n,!1):t.attachEvent("on"+e,n)},createCss:function(t,e){var n="";for(var i in e)n+=i+":"+e[i]+";";t.style.cssText=n},setCss:function(){var t=this,e={width:"Lateral"===t.options.direction?t.width*t.li.length+"px":t.width+"px",height:"Lateral"===t.options.direction?t.height+"px":t.height*t.li.length+"px",margin:"0px",clear:"both"},n={width:t.width+"px",height:t.height+"px",float:"Lateral"===t.options.direction?"left":"none",overflow:"hidden"};t.createCss(t.ul,e);for(var i=0;i<t.dataLength;i++)t.createCss(t.li[i],n)},setClass:function(t,e){for(var n=this,i=0;i<t.length;i++)t[i].getElementsByTagName("a")[0].className="";t[e].getElementsByTagName("a")[0].className=n.options.current},setText:function(t){var e=this;e.$$(e.options.text).innerText=e.data[t].title},createMainStructure:function(){var t,e=this;e.dom=t=document.createElement("div");for(var n=document.createElement("ul"),i=document.createElement("a"),a=document.createElement("a"),o=document.createDocumentFragment(),r=null,s=null,d=null,l=0;l<e.data.length;l++)r=document.createElement("li"),d=document.createElement("a"),s=document.createElement("img"),d.setAttribute("href",e.data[l].href),d.setAttribute("title",e.data[l].title),s.setAttribute("src",e.data[l].src),s.setAttribute("alt",e.data[l].title),d.appendChild(s),r.appendChild(d),o.append(r);t.setAttribute("id","slider"),t.setAttribute("class","slider"),i.setAttribute("class","arrow arrow-left"),i.setAttribute("id","arrow-left"),a.setAttribute("class","arrow arrow-right"),a.setAttribute("id","arrow-right"),n.appendChild(o),t.appendChild(n),t.appendChild(i),t.appendChild(a),e.slider.appendChild(t)},createBodyStructure:function(){var t,e=this;e.title=t=document.createElement("div");for(var n,i,a=document.createElement("div"),o=document.createElement("ul"),r=document.createDocumentFragment(),s=0;s<e.dataLength;s++)n=document.createElement("li"),i=document.createElement("a"),i.appendChild(document.createTextNode(s+1)),i.setAttribute("data-id",s),n.appendChild(i),r.appendChild(n);a.setAttribute("id",e.options.nav),a.setAttribute("class","promo-nav"),t.setAttribute("id","slider-text"),t.setAttribute("class","slider-text"),o.appendChild(r),a.appendChild(o),e.slider.appendChild(a),e.options.isText&&e.slider.appendChild(t)},getInitParams:function(){var t=this;t.ul=t.dom.getElementsByTagName("ul")[0],t.li=t.ul.getElementsByTagName("li"),t.width=t.dom.offsetWidth,t.height=t.dom.offsetHeight},showIndex:function(){var t,e=this;e.options.index>=e.dataLength&&(e.options.index=e.dataLength-1),e.options.index<0&&(e.options.index=0),t="Lateral"===e.options.direction?e.options.index*e.width:-e.options.index*e.height,"Lateral"===e.options.direction?e.ul.style.marginLeft=-t+"px":e.ul.style.marginTop=t+"px";var n=e.$$(e.options.nav).getElementsByTagName("ul")[0].getElementsByTagName("li");e.setClass(n,e.options.index),e.options.isText&&e.setText(e.options.index)},mouserover:function(){var t=this;t.options.isHidden&&(t.$$("arrow-left").style.display="block",t.$$("arrow-right").style.display="block")},mouserout:function(){var t=this;t.options.isHidden&&(t.$$("arrow-left").style.display="none",t.$$("arrow-right").style.display="none")},arrowLeft:function(){var t=this;t.action(t.options.index--)},arrowRight:function(){var t=this;t.action(t.options.index++)},domEvent:function(){var t=this;t.addEvent(t.slider,"mouseover",function(){t.mouserover()}),t.addEvent(t.slider,"mouseout",function(){t.mouserout()}),t.addEvent(t.$$("arrow-left"),"click",function(){t.arrowLeft()}),t.addEvent(t.$$("arrow-right"),"click",function(){t.arrowRight()}),t.addEvent(t.$$(t.options.nav),"click",function(e){"A"===e.target.nodeName&&(t.options.index=1*e.target.getAttribute("data-id"),t.action())})},interval:function(){var t=this;t.re=setInterval(function(){t.action(t.options.index++)},t.options.time)},action:function(){var t=this,n=b=c=e=0,i=t.options.speed;if(t.options.index<0&&(t.options.index=t.li.length-1),t.options.index>=t.li.length&&(t.options.index=0),e="Lateral"===t.options.direction?-t.options.index*t.width:-t.options.index*t.height,b="Lateral"===t.options.direction?parseInt(t.ul.style.marginLeft):parseInt(t.ul.style.marginTop),c=e-b,t.animate(n,b,c,i),t.options.nav){var a=t.$$(t.options.nav).getElementsByTagName("ul")[0].getElementsByTagName("li");t.setClass(a,t.options.index)}t.options.isText&&t.setText(t.options.index)},animate:function(t,e,n,i){var a=this,o=a.effect(a.options.effect);clearTimeout(a.animateTime),"Lateral"===a.options.direction?a.ul.style.marginLeft=parseInt(o(t,e,n,i))+"px":a.ul.style.marginTop=parseInt(o(t,e,n,i))+"px",t<i&&(t++,a.animateTime=setTimeout(function(){a.animate(t,e,n,i)},20))},effect:function(t){var e=this;switch(t){case"Linear":return e.Tween.Linear;case"Quint":return e.Tween.Quint;case"Expo":return e.Tween.Expo;case"Bounce":return e.Tween.Bounce;default:return e.Tween.Quint}},Tween:{Linear:function(t,e,n,i){return n*t/i+e},Quint:function(t,e,n,i){return n*((t=t/i-1)*t*t*t*t+1)+e},Expo:function(t,e,n,i){return t===i?e+n:n*(1-Math.pow(2,-10*t/i))+e},Bounce:function(t,e,n,i){return(t/=i)<1/2.75?n*(7.5625*t*t)+e:t<2/2.75?n*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?n*(7.5625*(t-=2.25/2.75)*t+.9375)+e:n*(7.5625*(t-=2.625/2.75)*t+.984375)+e}},init:function(){var t=this;t.createMainStructure(),t.createBodyStructure(),t.getInitParams(),t.setCss(),t.showIndex(),t.options.auto&&t.interval(),t.options.isHidden&&(t.$$("arrow-left").style.display="none",t.$$("arrow-right").style.display="none"),t.domEvent()}},{Mslider:a}});