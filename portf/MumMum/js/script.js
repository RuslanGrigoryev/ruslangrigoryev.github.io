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

		hideFunImage();

		$(window).resize(function () {
			hideFunImage();
		});

		/*lIGHTBOX*/
    $("a[rel^='prettyPhoto']").prettyPhoto();
});

/*Hide item cell on fun page*/

function hideFunImage () {

	var wWidth = $(window).width()+17,
	    item   = $('.item_cell');

	if (wWidth < 1920 && wWidth > 1700 && item.length) {
		item.removeClass('selected-nb');
		item.removeClass('selected-exsm');
		item.removeClass('selected-sm');
		if ( item.length > 6 ) {
			item.each(function (i) {
				if (i > 5) {
					$(this).addClass('selected-hd');
					$(this).show();
				}
			});
			if ( $('.selected-hd').length ) {	
				var itemSelected       = $('.selected-hd'),
					itemSelectedLength = itemSelected.length;
				if (itemSelectedLength%6 != 0) {
					var restSelected = itemSelectedLength%6;
					itemSelected.slice(-restSelected).hide();
				}
			}
		}
	}
	if (wWidth < 1694 && wWidth > 1495 && item.length ) {
		item.removeClass('selected-hd');
		item.removeClass('selected-exsm');
		item.removeClass('selected-sm');
		if (item.length > 4) {
			item.each(function (i) {
				if (i > 3) {
					$(this).addClass('selected-nb');
					$(this).show();
				}
			});
			if ($('.selected-nb').length) {
				var itemNbSelected = $('.selected-nb'),
					itemNbSelectedLength = itemNbSelected.length;
				if (itemNbSelectedLength%5 != 0) {
					var restNbSelected = itemNbSelectedLength%5;
					itemNbSelected.slice(-restNbSelected).hide();
				}

			}
		}

	}
	if (wWidth < 1495 && wWidth > 1195 && item.length ) {
		item.removeClass('selected-hd');
		item.removeClass('selected-nb');
		item.removeClass('selected-exsm');
		if (item.length > 2) {
			item.each(function (i) {
				if (i > 1) {
					$(this).addClass('selected-sm');
					$(this).show();
				}
			});
			if ($('.selected-sm').length) {
				var itemSmSelected = $('.selected-sm'),
					itemSmSelectedLength = itemSmSelected.length;
				if (itemSmSelectedLength%4 != 0) {
					var restSmSelected = itemSmSelectedLength%4;
					itemSmSelected.slice(-restSmSelected).hide();
				}

			}
		}

	}
	if (wWidth < 1190) {
		item.removeClass('selected-hd');
		item.removeClass('selected-nb');
		item.removeClass('selected-sm');
		item.each(function (i) {
				$(this).addClass('selected-exsm');
					$(this).show();
		});
		if ($('.selected-exsm').length) {
			var itemExsmSelected = $('.selected-exsm'),
				itemExsmSelectedLength = itemExsmSelected.length;
			if (itemExsmSelectedLength%3 != 0) {
				var restExsmSelected = itemExsmSelectedLength%3;
				itemExsmSelected.slice(-restExsmSelected).hide();
			}
		} 
	}
}
