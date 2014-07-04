var sliderModule = function ( _parent , _currentSlide) {
    var parent        = $(_parent),
        slideUl       = parent.find('.slider-list'),
        slideItem     = parent.find('li'),
        slideCount    = slideItem.length,
        slideWidth    = slideItem.width(),
        slideHeight   = slideItem.height(),
        sliderUlWidth = slideCount * slideWidth,
        sliderPrev    = parent.find('.control_prev'),
        sliderNext    = parent.find('.control_next'),
        counter       = parent.find('.control_count'),
        currentSlide  = _currentSlide || 1,
        init          = function () {
            parent.css({ width: slideWidth + 1, height: slideHeight + 25 });
            slideUl.css({ width: sliderUlWidth, marginLeft: - slideWidth });
            slideUl.find('li:last-child').prependTo(slideUl);
            counter.text(currentSlide + " / " + slideCount);
        },
        action        = function () {
            init();
            sliderPrev.on('click', function (e) {
                e.preventDefault();
                moveLeft();
            });

            sliderNext.on('click', function (e) {
                e.preventDefault();
                moveRight();
            });
        },
        moveLeft      = function () {
            slideUl.animate({
                left: + slideWidth
            }, 200, function () {
                slideUl.find('li:last-child').prependTo(slideUl);
                slideUl.css('left', '');
                if (currentSlide <= 1) {
                    currentSlide = slideCount + 1;
                }
                counter.text(--currentSlide + " / " + slideCount);
            });
        },
        moveRight     = function () {
            slideUl.animate({
                left: - slideWidth
            }, 200, function () {
                slideUl.find('li:first-child').appendTo(slideUl);
                slideUl.css('left', '');
                if (currentSlide >= slideCount) {
                    currentSlide = 0;
                }
                counter.text(++currentSlide + " / " + slideCount);
            });
        };
        return {
            action      : action
        }
};