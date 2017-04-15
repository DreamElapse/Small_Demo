$(function() {
	
	(function() {
		var b = window.B || {};
		var e = b.app || (b.app = {});
		e.log = function(r, p, o, q) {
			if (typeof o === "function") {
				q = o;
				o = {}
			}
			b.log.send($.extend({
				ct: 3,
				cst: 2,
				clk_from: r,
				clk_info: p
			}, o), q)
		};
		e.addSource = function(o) {
			var q = navigator.userAgent;
			var p = {
				product: "baiduBoxMode"
			};
			var r = {
				buildScheme: function(u) {
					var v = this;
					var t = ["invokeBdBox_" + p.product, v.getUserBdid(), v.getOs() + "_" + v.getOsVersion(), v.getBrowser()];
					var w = t.join(",");
					var s = u + "&needlog=1&logargs=" + encodeURIComponent(JSON.stringify({
						source: w
					}));
					return s
				},
				getOs: function() {
					return $.os.ios ? "iOS" : "android"
				},
				getOsVersion: function() {
					return $.os.version.split(".")[0]
				},
				getBrowser: function() {
					var t = "";
					var s = {
						UCBrowser: "UCBrowser",
						QQBrowser: "QQBrowser",
						baidubrowser: "baidubrowser",
						SogouMobileBrowser: "SogouMobileBrowser"
					};
					var u = {
						CriOS: "Chrome",
						OPiOS: "OPRBrowser",
						"": "Safari"
					};
					var v = {
						OPR: "OPRBrowser",
						MiuiBrowser: "MiuiBrowser",
						HUAWEI: "HUAWEIBrowser",
						"360 Aphone Browser": "360AphoneBrowser",
						"": "origin"
					};
					$.each(s, function(x, w) {
						if (q.indexOf(x) !== -1) {
							t = w;
							return false
						}
					});
					if (!t) {
						if ($.os.ios) {
							$.each(u, function(w, x) {
								if (q.indexOf(w) !== -1) {
									t = x;
									return false
								}
							})
						} else {
							$.each(v, function(w, z) {
								if (q.indexOf(w) !== -1) {
									t = z;
									return false
								}
							})
						}
					}
					return t
				},
				getUserBdid: function() {
					var s = document.cookie.split(";");
					var t = "";
					$.each(s, function(v, w) {
						if (w.split("=")[0].trim() === "BAIDUID") {
							var u = w.split("=")[1] + "";
							t = u.substr(u.Length - 1).split(":")[0]
						}
					});
					return t
				}
			};
			return r.buildScheme(o)
		};
		var n = $('[data-formposition="i"]');
		n.find(".se-input").on("focus", function() {
			$(this).closest(".se-form").addClass("focus")
		}).end().find(".baiduapp-icon").on("click", function() {
			var o = $(this).closest(".callicon-wrap").toggleClass("open");
			var p = $(this).closest(".se-form").data("formposition");
			e.log(p, o.hasClass("open") ? 1 : 2);
			return false
		});
		var h;
		var k;
		var i;
		var m;
		var l = 8 * 1024 * 1024;
		var g = n.find(".call.qrcode");

		function d() {
			h = $("#ts-image-uploader");
			
			k = document.createElement("div");
			k.style.cssText = "width:40%; background:#000; opacity:0.7;height:110px;border-radius:5px; position:fixed; top:40%; left:30%; z-index:999999;";
			i = document.createElement("div");
			i.style.cssText = "margin-top:20px; display:inline-block;height:40px; width:40px;background:url(//m.baidu.com/static/search/loading.gif) no-repeat; background-size:40px 40px";
			m = document.createElement("div");
			m.style.cssText = "text-align:center; font-size:14px; color:#fff; margin-top:10px";
			m.innerHTML = "图片识别中...";
			k.appendChild(i);
			k.appendChild(m);
			h.off("change click");
			h.one("change", function() {
				
				var p = h[0].files[0];
				if (p.size && p.size > l) {
					f("图片过大", 2000);
					h.after(h.clone().val(""));
					h.remove();
					d();
					return false
				}
				var o = new FormData();
				o.append("image", p);
				o.append("tn", "wise");
				document.body.appendChild(k);
				var q = new XMLHttpRequest();
				q.abort();
				q.addEventListener("load", j, false);
				q.addEventListener("error", c, false);
				q.open("POST", "https://sp0.baidu.com/-aYHfD0a2gU2pMbgoY3K/upload");
				q.send(o)
			});
			h.on("click", function() {
				g.trigger("click")
			})
		}
		function j(o) {
			document.body.removeChild(k);
			var p = JSON.parse(o.target.responseText);
			var q = "http://graph.baidu.com";
			h.after(h.clone().val(""));
			h.remove();
			d();
			if (p.status === 0) {
				setTimeout(function() {
					window.location.href = q + p.data.url
				}, 10)
			} else {
				f("图片搜索失败", 2000)
			}
		}
		function c(o) {
			document.body.removeChild(k);
			f("上传图片失败", 2000);
			h.after(h.clone().val(""));
			h.remove();
			d()
		}
		function f(q, p) {
			p = isNaN(p) ? 3000 : p;
			var o = document.createElement("div");
			o.innerHTML = q;
			o.style.cssText = "width:60%; min-width:150px; background:#000; opacity:0.7; height:40px; color:#fff; line-height:40px;text-align:center; border-radius:5px; position:fixed; top:40%; left:20%; z-index:999999;";
			document.body.appendChild(o);
			setTimeout(function() {
				var r = 0.5;
				o.style.webkitTransition = "-webkit-transform " + r + "s ease-in, opacity " + r + "s ease-in";
				o.style.opacity = "0";
				setTimeout(function() {
					document.body.removeChild(o)
				}, r * 1000)
			}, p)
		}
		d();
		var a = $('[data-formposition="i"]').find(".call").on("click", function(p) {
			if (a.data("lock") === 1) {
				return
			}
			var o = "voice";
			var q = $(this).closest(".se-form").data("formposition");
			if ($(this).hasClass("qrcode")) {
				o = "qrcode"
			}
			e.log(q, o === "qrcode" ? 3 : 4);
			if ($.os.android && o === "qrcode") {
				return
			}
			a.data("lock", 1);
			b.app.invoke(o).always(function() {
				a.data("lock", null)
			}).done(function() {}).fail(function() {
				if (o === "voice") {
					b.app.downloadPannel(o).done(function() {
						e.log(q, o === "qrcode" ? 5 : 6)
					})
				} else {}
				e.log(q, 9, {
					clk_extra: o === "qrcode" ? 1 : 2
				})
			});
			return false
		})
	})();;
	var b = window.B || (window.B = {});
	var a = b.app || (b.app = {});
	a.getVersion = function() {
		var c = $.Deferred();
		setTimeout(c.reject, 0);
		return c.promise()
	};
	a.invoke = function(i) {
		var e = $.Deferred();
		var f = /iP(ad|hone|od)/.test(navigator.userAgent) && (/OS 9_\d(_\d)?/).test(navigator.userAgent);
		var d = ["source_app=" + [$("#commonBase").data("browserid"), $("#commonBase").data("browserversion")].join("|"), "referer=" + location.href].join("&");
		var j = {
			qrcode: "baiduboxapp://imagesearch?caller=wise_search&args=" + encodeURIComponent(d),
			voice: "baiduboxapp://voicesearch?opennewwindow&caller=wise_search&args=" + encodeURIComponent(d)
		};
		var c = a.addSource(j[i]);
		if (f && "voice" === i) {
			setTimeout(function() {
				location.href = c
			}, 0)
		} else {
			var h = $("<iframe>").css("display", "none").attr("src", c);
			$(document.body).append(h)
		}
		var g = +new Date;
		setTimeout(function() {
			if (+new Date - g <= 1050) {
				e.reject()
			} else {
				e.resolve()
			}
		}, 1000);
		return e.promise()
	};
	a.downloadPannel = function(d) {
		var c = $.Deferred();
		var f = "安装百度客户端，使用条码、二维码识别！（还有神奇的明星脸 CD封面 图书识别哦~）";
		var e = "itms-apps://itunes.apple.com/cn/app/shou-ji-bai-du-xiao-shuo-zui/id382201985?pt=328057&ct=pic1-20120226&mt=8";
		if (d === "voice") {
			f = "让您不用打字，说话就能搜索";
			e = "itms-apps://itunes.apple.com/cn/app/shou-ji-bai-du-xiao-shuo-zui/id382201985?pt=328057&ct=voice1-20120226&mt=8"
		}
		setTimeout(function() {
			c.resolve();
			location.href = e
		}, 10);
		return c.promise()
	}
});
