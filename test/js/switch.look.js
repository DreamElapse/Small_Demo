$(function(){
	var $changeImg=$("#changeImg"),
		$dragBot=$("#dragBot");

	// 一个元素
	// 拉伸产品
	$dragBot.bind("mousedown", function (event) {
		event.preventDefault();
		/* 获取需要拖动节点的坐标 */
		var offset_x = $(this)[0].offsetLeft; //x坐标
		var margin = 680 - $dragBot.width();
		/* 获取当前鼠标的坐标 */
		var mouse_x = event.pageX;
		$dragBot.bind("mousemove", function (ev) {
			/* 计算鼠标移动了的位置 */
			var _x = ev.pageX - mouse_x;
			/* 设置移动后的元素坐标 */
			var num_x = (offset_x + _x);
			var now_x = num_x + "px";
			if (num_x <= 1) {
				$dragBot.parent().removeClass("moved");
				$dragBot.css({ left: 0 });
				$changeImg.width("0%");
			} else if (num_x > 1 && num_x <= margin) {
				$dragBot.parent().addClass("moved");

				$changeImg.width(Math.round(num_x / margin * 100) + "%");
				/* 改变目标元素的位置 */
				$dragBot.css({
					left: now_x
				});
			} if (num_x > margin) {
				$changeImg.width("100%");
			}

		});
	});

	$(document).bind("mouseup",function(){
		$dragBot.unbind("mousemove");
	});

})