$(function () {

	/*click*/
	var $btn    = $('#jsBtnLink'),
	    $bannerHeight = $('#banner').height();

	    $btn.on('click', function (e) {
	    	e.preventDefault();

	    	console.log($bannerHeight);

	    	$('html, body').animate({
	    	        scrollTop: $("#banner").offset().top + $bannerHeight + 23
	    	}, 1000);
	    })
});
