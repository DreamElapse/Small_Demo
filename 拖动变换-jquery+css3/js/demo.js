(function () {
	var main = {
			init: function(){
				var is = this;
				is.Drag();
			},
			Drag: function(){
				//试妆演示
				var imgDateU,imgDateO,imgTitle,
					$changeImg=$("#changeImg"),
					$dragP3=$("#dragP3"),
					grey = "grey.png",
					$dateUrl = $("#dateUrl"),
					$dateOrder = $("#dateOrder"),
					$proName = $("#proName");
				// 一个元素
				// 拉伸产品
				$dragP3.bind("mousedown", function (event) {
					event.preventDefault();
					/* 获取需要拖动节点的坐标 */
					var offset_x = $(this)[0].offsetLeft; //x坐标
					var margin = 600 - $dragP3.width();
					/* 获取当前鼠标的坐标 */
					var mouse_x = event.pageX;
					$dragP3.bind("mousemove", function (ev) {
						/* 计算鼠标移动了的位置 */
						var _x = ev.pageX - mouse_x;
						/* 设置移动后的元素坐标 */
						var num_x = (offset_x + _x);
						var now_x = num_x + "px";
						if (num_x <= 1) {
							$dragP3.parent().addClass("dragp_ing");
							$dragP3.css({ left: 0 });
							$changeImg.width("0%");
						} else if (num_x > 1 && num_x <= margin) {
							$dragP3.parent().removeClass("dragp_ing");
							$changeImg.removeClass("autoCH");
							$changeImg.width(Math.round(num_x / margin * 100) + "%");
							/* 改变目标元素的位置 */
							$("#dragP3,#dragP2").css({
								left: now_x
							});
						} if (num_x > margin) {
							$changeImg.width("100%");
						}

					});
				});
				
				function changeImg(obj,img){obj.attr("src","images/"+ img +"");}
				function changeBg(obj,bg){obj.attr("style","background-image:url(images/"+ bg +")");}
				function objAttrVal(imgDateU,imgDateO,imgTitle){
					$dragP3.parent().addClass("dragp_ing");
					$changeImg.removeClass("autoCH");
					$dateUrl.attr("href",imgDateU);
					$dateOrder.attr("href",imgDateO);
					$proName.fadeTo("normal", 0.5).html(imgTitle).fadeTo("normal", 1);
				}
				
				$(".chose_tab a").each(function(e){
					//console.log(date_ch);
					$(this).click(function(){
						var is = $(this),
							date_ex= is.attr("date-ex"),
							date_ch= is.attr("date-ch");
						changeImg($("#changeExImg"),date_ex);
						changeBg($("#changeImg"),date_ch);
						$changeImg.removeClass("autoCH");
						$(this).addClass("on").siblings().removeClass("on");
						$(".chose_box .picRoll").eq(e).show().siblings().hide();
						var cBoxdivFist = $(".chose_box .picRoll").eq(e).find(".scroll>ul>li>div:first"),
							imgTitle = cBoxdivFist.find("img").attr("title"),
							imgDateU = cBoxdivFist.find("img").attr("date-url"),
							imgDateO = cBoxdivFist.find("img").attr("date-order");
							objAttrVal(imgDateU,imgDateO,imgTitle);
						for( a=1; a<=3; a++ ){
							if( cBoxdivFist.attr("date-dragP"+a+"")==0 ){
								changeBg($("#dragP"+a+""),grey);
							}else{
								changeBg($("#dragP"+a+""),cBoxdivFist.attr("date-dragP"+a+""));
							}
						}
				//		ScrollInit();
					})
				})
				
				$(".scroll>ul>li>div").each(function(e){
					$(this).click(function(){
						var is = $(this),
							imgTitle = $(this).find("img").attr("title"),
							imgDateU = $(this).find("img").attr("date-url"),
							imgDateO = $(this).find("img").attr("date-order");
					//	console.log( objAttrVal($(this).find("img"),"title") )
						objAttrVal(imgDateU,imgDateO,imgTitle);
						$changeImg.css({"width":"0"});
						for( a=1; a<=3; a++ ){
							if( is.attr("date-dragP"+a+"")==0 ){
								changeBg($("#dragP"+a+""),grey);
							}else{
								changeBg($("#dragP"+a+""),is.attr("date-dragP"+a+""));
							}
						}
					})
				});
				
				$(document).bind("mouseup",function(){
					$dragP3.unbind("mousemove");
				});
			}
	}
	main.init();
})(); 