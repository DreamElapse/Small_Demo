(function(){
		var container=$('.container'),
			containerH=$(window).height(),
			containerW=container.width();
		function randomInt(low,high){
			return low+Math.floor(Math.random()*(high-low)); //在一个范围内随机一个整数，用于设定随机使用的图片
		}
		function randomFloat(low,high){
			return low+Math.random()*(high-low); //在一个范围内随机一个数
		}
		function fly(){
			var feye_container=$('#feye_container'); 
			function createLeaves(){
				var userAgent= window.navigator.userAgent.toLowerCase(); //声明用户使用的浏览器

				var url='snow.png'; //随机一个图片 var url='snow_'+randomInt(1,10)+'.png';	
				var img_class=(Math.random() < 0.5) ? 'roll_s' : 'roll_n'; //随机一个类名
				if($.browser.msie&&/msie 8\.0/i.test(userAgent)){ //兼容IE，判断用户使用IE时修复IE下的bug
					var sub_div=$('<div></div>').css({
						'background':'none',
						'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+url+')',
						'width':22,
						'height':22
					}).addClass(img_class); //给图片添加类
					return sub_div;
				}else{					
					var img=$('<img />').attr({  //获取图片
						'src':url
					});					
					img.css('width',randomFloat(20,30)+'px');	//随机图片的宽度在50到100范围内				
					return img;
				}							
			}
			setInterval(function(){  //一个循环定时器
				var aniDuration=randomFloat(5000,10000);//div动画的持续时间
				var startLeft=randomFloat(10,containerW), //设定图片出来的位置在100到屏幕总宽度范围内
				endLeft=startLeft+ Math.random() * 500, //图片落到底时的位置		
				endTop=containerH; //屏幕的高度、浏览器高度
				var img_container=createLeaves();
				img_container.css('left',startLeft);  //设定图片刚出来是的位置
				feye_container.append(img_container);  //在类名为feye_container那个div内添加一个图片
				img_container.animate({  //图片高度变化、水平运动轨迹、透明度从1变0
					top:endTop,  
					left:endLeft,
					opacity:0						
				},aniDuration,'linear',function(){  //定时器的运动过程参数
					$(this).remove()
				})		
			},300);//0.8秒出一个图片
		}
		fly(); //闭包
	})()