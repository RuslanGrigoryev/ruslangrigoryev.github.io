(function($) {

	$.fn.getCoordinates = function(e) {
		var x = 0, y = 0;

		var offset = $(this).offset();

		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		} else if (e.clientX || e.clientY) {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		} else if("undefined" != typeof e.originalEvent) {

			var touches = e.originalEvent.touches[0];
			if (touches.pageX || touches.pageY) {
				x = touches.pageX;
				y = touches.pageY;
			} else if (touches.clientX || touches.clientY) {
				x = touches.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				y = touches.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
		}

		return {
			x: x - offset.left,
			y: y - offset.top
		};
	};
	
})(jQuery);