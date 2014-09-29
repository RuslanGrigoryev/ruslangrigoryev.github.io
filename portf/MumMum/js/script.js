$(function () {
	/*Mobile menu expand*/

	var $mobileLink = $('.header__menu_mobile__main-link'),
		$mobileMenu = $('.mobile-menu');

		$mobileLink.on('click', function (e) {

			e.preventDefault();
			var $self = $(this);

			$self.toggleClass('header__menu_mobile__main-link_active');
			$mobileMenu.slideToggle(600);

		})

		if ( $('.isotope').length ) {
			$('.isotope').isotope({
			    itemSelector: '.item',
			    masonry: {
			      columnWidth: 225,
			      gutter: 15
			    }
			  });
		}

		/*Slide photo layer*/

		$('.photo-block__inner').find('.cell').mouseover(function () {
			$(this).find('.photo-block__inner__layer').slideDown(400);
		});

		$('.photo-block__inner__layer').mouseleave(function () {
			$(this).slideUp(400);
		})

});
