var addEvent = function(el, type, handle) {
	addEvent = el.addEventListener ? function (el, type, handle) {
		el.addEventListener(type, handle, false);
	} : function (el, type, handle) {
		el.attachEvent('on' + type, handle);
	};

	// 保持每次调用对外表现行为一致
	addEvent(el, type, handle);
}
