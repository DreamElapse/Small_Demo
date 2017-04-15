define("history/profile_history.js",[],function (require,exports,module,alert){
"use strict";
function init(opt){
var dom;
dom=document.querySelector?document.querySelector(opt.container):document.getElementById(opt.container.slice(1));
var msgList=eval("("+string.htmlDecode(opt.msgList)+")"),scrollTop=doc.documentElement.scrollTop||doc.body.scrollTop,windowHeight=win.innerHeight||doc.documentElement.clientHeight,documentHeight=doc.body.scrollHeight,can_msg_continue=opt.can_msg_continue;
msgList&&dom&&(dom.innerHTML+=template.compile(tmp)({
list:processList(msgList.list),
biz:opt.biz||biz,
uin:opt.uin||uin,
key:opt.key||key,
openkey:opt.openkey,
height:height
})),handleMedia(),Number(can_msg_continue)||(loading.style.display="none",nomore.style.display=""),
opt.canLoadMore&&DomEvent.on(win,"scroll",function(e){
if(isLoading)return!1;
if(Number(can_msg_continue)&&isScrollEnd()){
loading.style.display="",isLoading=!0;
var param=["__biz="+biz,"f=json","frommsgid="+getMinMsgId(),"count="+opt.countPerLoad].join("&");
Ajax({
url:"/mp/profile_ext?action=getmsg&"+param+"&scene="+scene,
type:"get",
success:function(data){
var data=eval("("+data+")");
if(loading.style.display="none",!data||0!=data.ret)return alert("系统繁忙，请稍后再试"),void(isLoading=!1);
can_msg_continue=data.can_msg_continue;
var tmpList=JSON.parse(data.general_msg_list);
renderList(tmpList.list,dom),isLoading=!1,0==can_msg_continue?nomore.style.display="":loading.style.display="";
}
});
}
}),addEvent(dom);
}
function getMinMsgId(){
var e=document.getElementsByClassName("weui_media_box");
return e[e.length-1].getAttribute("msgid");
}
function getScrollTop(){
return doc.documentElement.scrollTop||doc.body.scrollTop;
}
function getWindowHeight(){
return win.innerHeight||doc.documentElement.clientHeight;
}
function getDocumentHeight(){
return doc.body.scrollHeight;
}
function isScrollEnd(){
return getScrollTop()+getWindowHeight()==getDocumentHeight();
}
function processList(e){
for(var t=e?e.length:0,i=0;t>i;i++){
if(e[i].comm_msg_info&&e[i].comm_msg_info.content){
for(var a=e[i].comm_msg_info.content.replace(/\\n/g,"<br>"),o=a.split("&lt;/a&gt;"),n=[],s=0,r=o.length;r>s;s++)n.push(o[s].replace(/&lt;a(.*?)href=&quot;([^"]*)&quot;(.*?)&gt;/g,'<a href="$2">'));
e[i].comm_msg_info.content=n.join("</a>");
}
if(e[i].app_msg_ext_info&&e[i].app_msg_ext_info.digest&&(e[i].app_msg_ext_info.digest=e[i].app_msg_ext_info.digest.replace(/\\n/g,"<br>")),
e[i].comm_msg_info&&49==e[i].comm_msg_info.type&&9==e[i].app_msg_ext_info.subtype){
e[i].app_msg_ext_info.cover=e[i].app_msg_ext_info.cover.nogif();
var l=e[i].app_msg_ext_info.multi_app_msg_item_list.length;
if(l)for(var s=0;l>s;s++)e[i].app_msg_ext_info.multi_app_msg_item_list[s].cover=e[i].app_msg_ext_info.multi_app_msg_item_list[s].cover.nogif();
}
}
return e;
}
function renderList(e,t){
if(template){
var i=template.compile(tmp)({
list:processList(e),
biz:biz,
uin:uin,
key:key,
height:height
});
t.innerHTML+=i,handleMedia();
}
}
function successHandler(data,dom){
var data=eval("("+data+")");
if(loading.style.display="none",!data||0!=data.ret)return alert("系统繁忙，请稍后再试"),void(isLoading=!1);
can_msg_continue=data.can_msg_continue;
var tmpList=JSON.parse(data.general_msg_list);
renderList(tmpList.list,dom),isLoading=!1,0==can_msg_continue?nomore.style.display="":loading.style.display="";
}
function handleMedia(){
if(document.querySelectorAll){
var e=document.querySelectorAll(".weui_media_box.text");
if(e)for(var t=0,i=e.length;i>t;t++)"false"==e[t].getAttribute("data-flag")&&(e[t].innerHTML=Emoji.replaceEmoji(e[t].innerHTML),
e[t].setAttribute("data-flag","true"));
var a=document.querySelectorAll(".weui_audio");
if(a)for(var t=0,i=a.length;i>t;t++)if("false"==a[t].getAttribute("data-flag")){
var o=parseInt(a[t].getAttribute("length")),n=Math.ceil(o/1e3),s=n+"秒";
document.querySelectorAll(".weui_audio .audio_desc")[t].innerHTML=s,a[t].setAttribute("data-flag","true");
}
}
}
function voicePlay(e){
{
var t=e.querySelector("audio");
t.getAttribute("fileid");
}
if(Class.hasClass(e,"playing")){
Class.removeClass(e,"playing");
var i=e.querySelector("audio");
i.pause();
}else{
var a=document.querySelector(".playing");
if(a){
Class.removeClass(a,"playing");
var i=a.querySelector("audio");
i.pause();
}
Class.addClass(e,"playing"),t.play();
}
DomEvent.on(t,"ended",function(){
Class.removeClass(document.querySelector(".playing"),"playing");
});
}
function getParent(e,t){
for(;!e.parentNode.className.match(t);)e=e.parentNode;
return e.parentNode||"";
}
function getElementsByClassName(e,t,i){
var a="*"==t&&e.all?e.all:e.getElementsByTagName(t),o=new Array;
i=i.replace(/\-/g,"\\-");
for(var n,s=new RegExp("(^|\\s)"+i+"(\\s|$)"),r=0;r<a.length;r++)n=a[r],s.test(n.className)&&o.push(n);
return o;
}
function addEvent(e){
var t,i,a;
e.getElementsByClassName?(t=e.getElementsByClassName("weui_audio"),i=e.getElementsByClassName("appmsg"),
a=e.getElementsByClassName("weui_media_box")):(t=getElementsByClassName(e,"div","weui_audio"),
i=getElementsByClassName(e,"div","appmsg"),a=getElementsByClassName(e,"div","weui_media_box")),
DomEvent.on(e,"click",function(e){
var t=e.target||e.srcElement,i=t.getAttribute("hrefs"),a=("img"==t.tagName.toLowerCase()||"imgp"==t.getAttribute("data-type"))&&!!t.getAttribute("data-msgid");
if(a){
var o=t.getAttribute("data-msgid");
if(o&&uin&&key&&biz){
var n="https://mp.weixin.qq.com/mp/getmediadata?__biz="+biz+"&type=img&mode=normal&msgid="+o+"&uin="+uin+"&key="+key,s=new Array(n);
JSAPI.invoke("imagePreview",{
current:n,
urls:s
});
}
return!1;
}
if(t.className.match("audio")&&!t.className.match("weui_media_box")){
var r=getParent(t,"weui_media_box audio");
voicePlay(r.children[0]);
}else if(t.className.match("video")){
var r;
r=t.className.match("weui_media_box")?t:getParent(t,"weui_media_box video");
var i=r.getAttribute("hrefs");
i&&(top?top.location.href=i:location.href=i);
}else if((t.className.match("media")||t.className.match("icon_original_tag"))&&!t.className.match("text")){
var r;
r=t.className.match("weui_media_box")?t:getParent(t,"weui_media_box appmsg");
var i=r.getElementsByClassName("weui_media_title")[0].getAttribute("hrefs");
i&&(top?top.location.href=i:location.href=i);
}
},!0);
}
require("appmsg/cdn_img_lib.js");
var template=require("history/template_helper.js"),string=require("biz_common/utils/string/html.js"),tmp=require("history/profile_history.html.js"),Ajax=require("biz_wap/utils/ajax.js"),Emoji=require("biz_common/utils/string/emoji.js"),Class=require("biz_common/dom/class.js"),DomEvent=require("biz_common/dom/event.js"),JSAPI=require("biz_wap/jsapi/core.js"),_opt={
container:"",
canLoadMore:!0,
countPerLoad:5,
msgList:'{"list":[]}',
can_msg_continue:1
},win=top?top.window:window,doc=top?top.document:document,isLoading=!1,height=(window.screen.width-30)/1.9,loading=document.getElementById("js_loading"),nomore=document.getElementById("js_nomore");
return template.helper("handleVideoTime",function(e){
var t="";
if(60>e)10>e&&(e="0"+e),t="00:"+e;else if(e>=60){
var i=Math.floor(e/60),a=(e-60*i)%60;
10>i&&(i="0"+i),10>a&&(a="0"+a),t=i+":"+a;
}else if(e>=3600){
var o=Math.floor(e/3600),i=Math.floor((e-3600*o)/60),a=(e-3600*o-60*i)%60;
10>o&&(o="0"+o),10>i&&(i="0"+i),10>a&&(a="0"+a),t=o+":"+i+":"+a;
}
return t;
}),{
init:init
};
})//# sourceURL=history/profile_history.js
//@ sourceURL=history/profile_history.js