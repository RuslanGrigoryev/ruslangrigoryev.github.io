(function($) {

	var that = this;
	var $navigation = $('.navigation'),
		$logo = $('header .logo'),
		$userMenu = $('header .level1'),
		$companyName = $('header .name'),
		$presentationName = $('#presentation-name');

	var userMenuHeight = $userMenu.outerHeight(),
		companyNameHeight = $companyName.outerHeight(),
		presentationNameHeight = $presentationName.outerHeight(),
		logoHeight = $logo.outerHeight();
	var userMenuTop = 32,
		companyNameTop = 32,
		presentationNameTop = 130,
		logoTop = 0;

	//functions --
	var scroll = function() {
		var top = $(window).scrollTop(),
			left = $(window).scrollLeft();

		controllDownScroll($userMenu, userMenuTop, userMenuHeight, top);
		controllDownScroll($companyName, companyNameTop, companyNameHeight, top);
		controllDownScroll($presentationName, presentationNameTop, presentationNameHeight, top);

		// if(left > 0) {
		// 	setAbsolutePosition($navigation);
		// 	setAbsolutePosition($logo);
		// } else {
		// 	setFixedPosition($navigation);
		// 	setFixedPosition($logo);
		// }
	};
	var controllDownScroll = function($el, elTop, elHeight, scrollTop) {
		var newTop = elTop - scrollTop;
		$el.css({
			'top': newTop,
			'position': 'fixed'
		});
	};
	var setFixedPosition = function($el) {
		$el.css({
			'position': 'fixed'
		});
	};
	var setAbsolutePosition = function($el) {
		$el.css({
			'position': 'absolute'
		});
	};
	//--functions

	$(window).scroll(function() {
		scroll();
	});

	scroll();

})(jQuery);