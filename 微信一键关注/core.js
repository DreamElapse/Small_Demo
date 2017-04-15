define("biz_wap/jsapi/core.js",[],function (e,o,n,i){
"use strict";
document.domain="qq.com";
var t=window.__moon_report||function(){},d=8,r={
ready:function(e){
var o=function(){
try{
e&&e();
}catch(o){
throw t([{
offset:d,
log:"ready",
e:o
}]),o;
}
};
"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?o():top.window.document.addEventListener?top.window.document.addEventListener("WeixinJSBridgeReady",o,!1):top.window.document.attachEvent&&(top.window.document.attachEvent("WeixinJSBridgeReady",o),
top.window.document.attachEvent("onWeixinJSBridgeReady",o));
},
invoke:function(e,o,n){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?(i("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(e,o,function(o){
try{
if(n){
n.apply(window,arguments);
var i=o&&o.err_msg?", err_msg-> "+o.err_msg:"";
console.info("[jsapi] invoke->"+e+i);
}
}catch(r){
throw t([{
offset:d,
log:"invoke;methodName:"+e,
e:r
}]),r;
}
});
});
},
call:function(e){
this.ready(function(){
if("object"!=typeof top.window.WeixinJSBridge)return!1;
try{
top.window.WeixinJSBridge.call(e);
}catch(o){
throw t([{
offset:d,
log:"call;methodName:"+e,
e:o
}]),o;
}
});
},
on:function(e,o){
this.ready(function(){
return"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(e,function(){
try{
o&&o.apply(window,arguments);
}catch(n){
throw t([{
offset:d,
log:"on;eventName:"+e,
e:n
}]),n;
}
}):!1;
});
}
};
return r;
})//# sourceURL=biz_wap/jsapi/core.js
//@ sourceURL=biz_wap/jsapi/core.js