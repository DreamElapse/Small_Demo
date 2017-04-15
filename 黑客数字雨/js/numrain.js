var container = new Array();
var granule = 
{
	pos:{x:null,y:null},
	text:null
};
var Timer = null;
//∂‘œÛ∏¥÷∆
function clone(myObj)
{ 
	if(typeof(myObj) != 'object') return myObj; 
	if(myObj == null) return myObj; 
	var myNewObj = new Object(); 
	for(var i in myObj)
		myNewObj[i] = clone(myObj[i]); 
	return myNewObj; 
}
function initData()
{
	for(var i=0;i<200;i++)
	{
		var obj = clone(granule);
		updateLee(obj);
		container.push(obj);
	}
}
function updateLee(obj)
{
	obj.text = new Array(20);
	obj.pos.x = 30*parseInt(Math.random()*48);
	obj.pos.y = -1640+parseInt(Math.random()*1440);
	for(var j=0;j<obj.text.length;j++)
	{
		obj.text[j] = createChar();
	}
}
function createChar()
{
	var flag = parseInt(Math.random()*3);
	switch(flag)
	{
		case 0:
			return String.fromCharCode(parseInt(Math.random()*26+65));
		case 1:
			return String.fromCharCode(parseInt(Math.random()*26+97));
		case 2:
			return ""+parseInt(Math.random()*10);
	}
}
function async()
{
	for(var i=0;i<container.length;i++)
	{
		container[i].pos.y+=8;
		for(var j=0;j<container[i].text.length-1;j++)
		{
			container[i].text[j] = container[i].text[j+1];
		}
		container[i].text[container[i].text.length-1] = createChar();
		if(container[i].pos.y>1640)
		{
			updateLee(container[i]);
		}
	}
	onPaint();
}
function numAnimate()
{
	initData();
	Timer = setInterval("async()",100);
}
$(function()
{
	numAnimate();
});
function onPaint()
{
	var ctx=$("#numrain").get(0).getContext('2d');
	ctx.clearRect(0,0,$("#numrain").width(),$("#numrain").height());
	for(var i=0;i<container.length;i++)
	{
		for(var j=0;j<container[i].text.length;j++)
		{
			ctx.font = "8pt Arial";
			ctx.globalAlpha=(1+j)*0.05;
			ctx.beginPath();
			ctx.fillStyle=(j==container[i].text.length-1?"#FFFFFF":"#00FF00");
			ctx.fillText(container[i].text[j],container[i].pos.x,container[i].pos.y+8*j);
			ctx.closePath();
			ctx.fill();
		}
	}
}