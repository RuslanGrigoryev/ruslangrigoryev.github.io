$(function () {

		var $link = $('.link'),
		    $block = $('.block__item');

		    $link.on('click', function (e) {
		    	e.preventDefault();

		    	var that     = $(this), 
		    		dataLink = that.data('link');
		    	
		    	$block.hide();

		    	$block.each(function(index, el) {
		    		if ($(this).data('link') == dataLink) {
		    			$(this).fadeIn('fast');
		    		}
		    	});

		    })

	});