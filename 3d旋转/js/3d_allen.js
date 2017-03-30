/*
	3D产品展示
	2015-12-24
	@allen
*/
(function(e) {
	e.fn.a3dEye=function(options){
		 var _this = this;
		 var defaults = {}
		 var allen = $.extend(defaults, options || {});
		 var a = allen.imagePath,
		  b = allen.imagesCount,
		  c = allen.imagesType,
		  s,o=0,r=1;
		init();
		  function init(){
				_this.mousedown(function() {
						s = true
						});
				$(document).mouseup(function() {
						s = false
					});
				_this.mousemove(function(e){
					if (s) {
						play(e.pageX - this.offsetLeft);
						//console.log(e.pageX - this.offsetLeft)
					}else{
						o = e.pageX - this.offsetLeft

						}
					
				})
				_this.bind("touchstart", function() {
					s = true
				});
				$(document).bind("touchend", function() {
					s = false
				});
				_this.bind("touchmove", function(e) {
					e.preventDefault();
					var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					if (s){
						play(t.pageX - this.offsetLeft);
						//console.log(t.pageX - this.offsetLeft)
					}else{
						o = t.pageX - this.offsetLeft;
					}
				})
			}
		function play(t){
			console.log(o-t)
			if (o - t > 25) {
				o = t;
				r = --r < 1 ? b : r;
				_this.css("background-image", "url(" + a + r + "." + c + ")")
			} else if (o - t < -25) {
				o = t;
				r = ++r > b ? 1 : r;
				_this.css("background-image", "url(" + a + r + "." + c + ")")
			}
		}
	}
})(jQuery)