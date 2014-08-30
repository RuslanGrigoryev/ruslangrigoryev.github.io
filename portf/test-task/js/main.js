$(function () {
	/*Slider*/
	var $link  = $('.b-slider-case-element'),
	    $slide = $('.b-slide');

	$link.on('click', function (e) {
		e.preventDefault();

		var $self = $(this),
		    $selfData = $self.data('link');

		$slide.each(function () {
			if ( $(this).data('slide') == $selfData ) {
				$slide.removeClass('b-slide_active');
				$(this).addClass('b-slide_active');
			}
		});

		$link.find('.b-slider-case-element__number').removeClass('b-slider-case-element__number_active');
		$link.find('.b-slider-case-element__text').removeClass('b-slider-case-element__text_active');
		$self.find('.b-slider-case-element__number').addClass('b-slider-case-element__number_active');
		$self.find('.b-slider-case-element__text').addClass('b-slider-case-element__text_active');
	}) 

	/*Main menu*/

	$('.b-link_menu').on('click', function () {
		$('.b-link_menu').removeClass('b-link_menu_active');
		$(this).addClass('b-link_menu_active');
	});
});