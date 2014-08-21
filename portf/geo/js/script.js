$(function () {
	$('img').each(function (i) {
		$(this).width($(this).width()/1.3);
		$(this).height($(this).height()/1.3);
		console.log($(this).attr('src'));
	});

	$('.content').height($(window).height() );
});