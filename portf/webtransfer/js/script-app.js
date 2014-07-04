$(function () {
	$('.carousel-media').carousel('pause');

	$('.social-lang__link').on('click', function (e) {
		e.preventDefault();
		$('.social-lang__link').removeClass('grayscale');
		$(this).toggleClass('grayscale');
	});

	$( window ).scroll(function() {
	  var scrollTop     = $(window).scrollTop(),
          elementOffset = $('.garantee').offset().top,
          distance      = (elementOffset - scrollTop);
          
          if ( distance < $('.navbar-primary').height()+100 ) {
          	$('.navbar-fixed-top').addClass('pos-a');
          	$('.fixed-menu').addClass('pos-f').show();
          }
          else {
          	$('.navbar-fixed-top').removeClass('pos-a');
          	$('.fixed-menu').removeClass('pos-f').hide();
          }
	});

	Share = {
    facebook: function(purl, ptitle, pimg, text) {
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]='     + encodeURIComponent(ptitle);
        url += '&p[summary]='   + encodeURIComponent(text);
        url += '&p[url]='       + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
        Share.popup(url);
    },
    twitter: function(purl, ptitle) {
        url  = 'http://twitter.com/share?';
        url += 'text='      + encodeURIComponent(ptitle);
        url += '&url='      + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        Share.popup(url);
    },

    popup: function(url) {
        window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
    
};
  /*slider init*/
  $('.slide-wrap').htmSlider();
});