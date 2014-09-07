$(function () {
	/*advanced menu*/

	var $linkAdv = $('.menu__advanced__item').find('a');

	$linkAdv.on('click', function (e) {
		e.preventDefault();

		$('.menu__advanced__item').removeClass('menu__advanced__item_active');
		$(this).closest('.menu__advanced__item').toggleClass('menu__advanced__item_active');
	});

	htmSlider = function() {
		this._init = function(element, options) {
			var defaults = {
			slideWrap : $(element),
			nextLink : $('.next-slide'),
			prevLink : $('.prev-slide')        
			},
			settings = $.extend(defaults, options); 


			var slideWidth = settings.slideWrap.find('.slide-item').outerWidth(),
				newLeftPos = settings.slideWrap.position().left - slideWidth;
	   
			settings.nextLink.click(function(){
				if( settings.nextLink.attr('name') == 'next' ) {
				
					settings.nextLink.removeAttr('name');
					
					settings.slideWrap.animate({left: newLeftPos}, 500, function(){
						settings.slideWrap
							.find('.slide-item:first')
							.appendTo(settings.slideWrap)
							.parent()
							.css({'left': 0});
					});
					
					setTimeout(function(){ settings.nextLink.attr('name','next') }, 600);
				}
			});

			settings.prevLink.click(function(){
				if( settings.prevLink.attr('name') == 'prev' ) {
				
					settings.prevLink.removeAttr('name');
				
					settings.slideWrap
						.css({'left': newLeftPos})
						.find('.slide-item:last')
						.prependTo(settings.slideWrap)
						.parent()
						.animate({left: 0}, 500);

					setTimeout(function(){ settings.prevLink.attr('name','prev') }, 600);
				}
			}); 

			function autoplay(){
				settings.slideWrap.animate({left: newLeftPos}, 600, function(){
					settings.slideWrap
						.find('.slide-item:first')
						.appendTo(settings.slideWrap)
						.parent()
						.css({'left': 0});
				});
			}

			if(settings.slideWrap.hasClass('play')){
				setInterval(autoplay(), 500);
			}  
		};
	};
	// Launch plugin
	$.fn.htmSlider = function( options ){
	  return this.each(function(){
	       $( this ).data( "htmSlider", new htmSlider()._init( this, options ) );
	   });
	};

	$('.slide-wrap').htmSlider();

	var $sliderLink = $('.slide-item').find('a'),
		$sliderImages = $('.slider__images').find('img');

	$sliderLink.on('click', function (e) {
		e.preventDefault();
		$sliderLink.removeClass('slide-item__active');
		$(this).addClass('slide-item__active');
		var $linkData = $(this).data('link');

		$sliderImages.each(function () {
			if ( $(this).data('image') == $linkData ) {
				$sliderImages.removeClass('slider__images_active');
				$(this).addClass('slider__images_active');
			}
		});
	});
});