define("history/template_helper.js",[],function (e){
"use strict";
var t=e("biz_common/template-2.0.1-cmd.js");
return"undefined"!=typeof t&&(t.openTag="{{",t.closeTag="}}",t.helper("dateFormat",function(e,t){
e=new Date(e);
var n={
M:e.getMonth()+1,
d:e.getDate(),
h:e.getHours(),
m:e.getMinutes(),
s:e.getSeconds(),
q:Math.floor((e.getMonth()+3)/3),
S:e.getMilliseconds()
};
return t=t.replace(/([yMdhmsqSa])+/g,function(t,o){
var r=n[o];
return void 0!==r?(t.length>1&&(r="0"+r,r=r.substr(r.length-2)),r):"y"===o?(e.getFullYear()+"").substr(4-t.length):t;
});
})),t;
})//# sourceURL=history/template_helper.js
//@ sourceURL=history/template_helper.js