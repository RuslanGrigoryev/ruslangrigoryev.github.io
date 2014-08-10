var sliderModule = function ( _parent ) {
    var parent        = $(_parent),
        slideItem     = parent.find('li'),
        slideCount    = slideItem.length,
        slideWidth    = slideItem.width(),
        slideHeight   = slideItem.height(),
        sliderUlWidth = slideCount * slideWidth,
        init          = function () {
            $('.row-right').css({ width: slideWidth, height: slideHeight });
            $('.slider-list').css({ width: sliderUlWidth, marginLeft: - slideWidth });
            $('.slider ul li:last-child').prependTo('.slider-list');
        },
        action        = function () {
            init();
            $('a.control_prev').click(function (e) {
                e.preventDefault();
                moveLeft();
            });

            $('a.control_next').click(function (e) {
                e.preventDefault();
                moveRight();
            });
        },
        moveLeft      = function () {
            $('.slider-list').animate({
                left: + slideWidth
            }, 200, function () {
                $('.slider-list li:last-child').prependTo('.slider-list');
                $('.slider-list').css('left', '');
            });
        },
        moveRight     = function () {
            $('.slider-list').animate({
                left: - slideWidth
            }, 200, function () {
                $('.slider-list li:first-child').appendTo('.slider-list');
                $('.slider-list').css('left', '');
            });
        };
        return {
            action      : action
        }
}('.row-right').action();

$(function () {

    var tabLink = $('.tab__list__link'),
        tabList = $('.tab__list__item');

    tabLink.on('click', function (e) {
        e.preventDefault();

        tabList.removeClass('tab__list__item--active');
        $(this).closest('.tab__list__item').addClass('tab__list__item--active');

    });

});

// slider
(function($){

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
})(jQuery);
// end slider
    $('.slide-wrap').htmSlider();