//1.预加载图片
(function($) {
		var cache = [];
		// Arguments are image paths relative to the current page.
		$.preLoadImages = function() {
			var args_len = arguments.length;
			for (var i = args_len; i--;) {
				var cacheImage = document.createElement('img');
				cacheImage.src = arguments[i];
				cache.push(cacheImage);
			}
		}
		jQuery.preLoadImages("image1.gif", "/path/to/image2.png");

		//2.使元素适应移动设备
		var scr = document.createElement('script');
		scr.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js');
		document.body.appendChild(scr);
		scr.onload = function() {
			$('div').attr('class', '').attr('id', '').css({
				'margin': 0,
				'padding': 0,
				'width': '100%',
				'clear': 'both'
			});
		};

		//3.图像等比例缩放
		$(window).bind("load", function() {
			// IMAGE RESIZE
			$('#product_cat_list img').each(function() {
				var maxWidth = 120;
				var maxHeight = 120;
				var ratio = 0;
				var width = $(this).width();
				var height = $(this).height();
				if (width > maxWidth) {
					ratio = maxWidth / width;
					$(this).css("width", maxWidth);
					$(this).css("height", height * ratio);
					height = height * ratio;
				}
				var width = $(this).width();
				var height = $(this).height();
				if (height > maxHeight) {
					ratio = maxHeight / height;
					$(this).css("height", maxHeight);
					$(this).css("width", width * ratio);
					width = width * ratio;
				}
			});
			//$("#contentpage img").show();
			// IMAGE RESIZE
		});

		//4.返回页面顶部
		// Back To Top
		$(document).ready(function() {
			$('.top').click(function() {
				$(document).scrollTo(0, 500);
			});
		});
		//Create a link defined with the class .top
		// <a href="#" class="top">Back To Top</a>

		//5.手风琴式折叠效果
		var accordion = {
			init: function() {
				var $container = $('#accordion');
				$container.find('li:not(:first) .details').hide();
				$container.find('li:first').addClass('active');
				$container.on('click', 'li a', function(e) {
					e.preventDefault();
					var $this = $(this).parents('li');
					if ($this.hasClass('active')) {
						if ($('.details').is(':visible')) {
							$this.find('.details').slideUp();
						} else {
							$this.find('.details').slideDown();
						}
					} else {
						$container.find('li.active .details').slideUp();
						$container.find('li').removeClass('active');
						$this.addClass('active');
						$this.find('.details').slideDown();
					}
				});
			}
		};

		//6.图片展示廊
		var nextimage = "/images/some-image.jpg";
		$(document).ready(function() {
			window.setTimeout(function() {
				var img = $("").attr("src", nextimage).load(function() {
					//all done
				});
			}, 100);
		});

		//7.自动填充选择框
		$(function() {
			$("select#ctlJob").change(function() {
				$.getJSON("/select.php", {
					id: $(this).val(),
					ajax: 'true'
				}, function(j) {
					var options = '';
					for (var i = 0; i < j.length; i++) {
						options += '
						' + j[i].optionDisplay + '
						';
					}
					$("select#ctlPerson").html(options);
				})
			})
		})

		//8.自动替换丢失图片
		// Safe Snippet
		$("img").error(function() {
			$(this).unbind("error").attr("src", "missing_image.gif");
		});
		// Persistent Snipper
		$("img").error(function() {
			$(this).attr("src", "missing_image.gif");
		});

		//9.鼠标悬停淡入淡出效果
		$(document).ready(function() {
			$(".thumbs img").fadeTo("slow", 0.6); // This sets the opacity of the thumbs to fade down to 60% when the page loads
			$(".thumbs img").hover(function() {
				$(this).fadeTo("slow", 1.0); // This should set the opacity to 100% on hover
			}, function() {
				$(this).fadeTo("slow", 0.6); // This should set the opacity back to 60% on mouseout
			});
		});

		//10.清空表单数据
		function clearForm(form) {
			// iterate over all of the inputs for the form
			// element that was passed in
			$(':input', form).each(function() {
				var type = this.type;
				var tag = this.tagName.toLowerCase(); // normalize case
				// it's ok to reset the value attr of text inputs,
				// password inputs, and textareas
				if (type == 'text' || type == 'password' || tag == 'textarea')
					this.value = "";
				// checkboxes and radios need to have their checked state cleared
				// but should *not* have their 'value' changed
				else if (type == 'checkbox' || type == 'radio')
					this.checked = false;
				// select elements need to have their 'selectedIndex' property set to -1
				// (this works for both single and multiple select elements)
				else if (tag == 'select')
					this.selectedIndex = -1;
			});
		};

		//11.预防表单多次提交
		$(document).ready(function() {
			$('form').submit(function() {
				if (typeof jQuery.data(this, "disabledOnSubmit") == 'undefined') {
					jQuery.data(this, "disabledOnSubmit", {
						submited: true
					});
					$('input[type=submit], input[type=button]', this).each(function() {
						$(this).attr("disabled", "disabled");
					});
					return true;
				} else {
					return false;
				}
			});
		});

		//12.动态添加表单元素
		//change event on password1 field to prompt new input
		$('#password1').change(function() {
			//dynamically create new input and insert after password1
			$("#password1").append("");
		});

		//13.可点击整个div区域
		blah blah blah.link
		The following lines of jQuery will make the entire div clickable: $(".myBox").click(function() {
			window.location = $(this).find("a").attr("href");
			return false;
		});

		//14.平衡高度或div元素
		var maxHeight = 0;
		$("div").each(function() {
			if ($(this).height() > maxHeight) {
				maxHeight = $(this).height();
			}
		});
		$("div").height(maxHeight);

		//15.在窗口滚动时自动加载内容
		var maxHeight = 0;
		$("div").each(function() {
			if ($(this).height() > maxHeight) {
				maxHeight = $(this).height();
			}
		});
		$("div").height(maxHeight);