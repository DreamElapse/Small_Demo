// JavaScript Document

$(document).ready(function() {

//添加图片
$(function(){
	//选择文件后
	$('#upo').on('change',"input",function(e){
		var tar = this,
			files = tar.files,
			fNum = files.length,
			URL = window.URL || window.webkitURL || window.mozUrl || window.oURL || window.msURL,
			upoW = $(this).width();
		//如果文件为空，返回(即不执行)
		if(!files[0])return;
		for(var i=0;i<fNum;i++){
			if(files[i].type.search(/image/)>=0){
				var blob = URL.createObjectURL(files[i]);
				var newImg = new Image();
				var newDiv = '<div class="upo" data-id="' + $(".upo").length + '"><span><img src="images/close_ico.png"</span></div>';
				var newIpt = '<input id="myUp' + $(".upo").length + '" class="upImg" type="file" name="file" accept="image/*" />';
				$(this).parent().before(newDiv);
				$(this).after(newIpt);
				//$(this).hide();
				//图片加载进来后执行
				newImg.onload = function(){
					//在新的div中插入图片
					$('#upo').prev().append(newImg);
					//判断图片比例
					if(this.width > this.height){
						this.height = upoW;
					}else if(this.height > this.width){
						this.width = upoW;
					}else{
						return;
					};
				};
				newImg.src = blob;
				upoHeight($(".upo"));
			};
		};

		//当已添加的图片数量等于9时，隐藏添加按钮
		if($(".upo").length >= 10){
			$(this).parent().hide();
		}else if($(".upo").length > 1 ){	//当用户添加一张图片后隐藏提示
			$("#imgTs").hide();
		};

	});

	//添加时删除图片
	$(".addCn").on("click",".upo span",function(){
		$(this).parent().remove();
		var intId = $(this).parent().attr("data-id");
		$("#myCanvas"+intId).remove();
		$("#myUp"+intId).remove();
		//	console.log(intId);
	});

	upoHeight($(".upo"));
	//当用户没有添加图片直接提交时
	$("#faBu").click(function(){
		var gansou = $("#gsou").val();
		if( $(".upo").length < 2 || gansou.length < 1 ){
			$("#imgTs").show();
			return false;
		};
	});
	$("#gsou").focus(function(){
		$("#imgTs").hide();
	});
});

});

//设置元素高度等于宽度
function upoHeight(upo){
	upo.each(function(i,e){
		var upoH = $(e).width();
		$(e).height(upoH);
	});
};

//返回前一页,后退
function goBack(){
	window.history.back();
};