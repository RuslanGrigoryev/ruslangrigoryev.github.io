var MS_COLLECTION_ANIMATION = 1600,
    winHeight = $(window).height(),
    winWidth = $(window).width(),
    page,
    body = $('body'),
    bodyTop,
    upLink = $('.arrow-up'),
    downLink = $('.arrow-down'),
    currentPopupDistance,
    navPositionIpad,
    headerTop = 44,
    collectionZOOM = false,
    isMobileDevice = (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera),
    currentSlideName= $('.slide-item:eq(0)').attr('id');

$(function() {
    if ($('#collection').data('zoom')) collectionZOOM = true;
    console.log(isMobileDevice);
    //event listeners of all document

    function events() {
        var global = $('.global'), //global button
            global_wrap = $('.global-block-wrap'), //global block
            nextButton = $('.next-slide-button'),
            menuItem = $('.menu-item').find('a');
        scrollOn();
        navLinkArrows();
        $(window).on({
            resize: function() {
                winHeight = $(window).height();
                resizeHeights();
            }
        });
        $(".slide-item").swipe({
            swipe: function(event, direction) {
                if (direction == "down") {
                    nextSlide(false);
                }
                if (direction == "up") {
                    nextSlide(true);
                }
            },
            threshold: 50,
            fingers: 'all'
        });
    }


    function resizeHeights() {
        $('.slide-item').each(function() {
            $(this).css({
                height: winHeight,
                maxHeight: winHeight
            });
        });
    }

    function navLinkArrows () {
        var direction;
        upLink.on('click', function (e) {
        e.preventDefault();
        direction = false;
            if (!nowScrolling) {
                nextSlide(direction);
            }
        });

        downLink.on('click', function (e) {
        e.preventDefault();
        direction = true;
            if (!nowScrolling) {
                nextSlide(direction);
            }
        });
    }

    /**
     * turn on mousewheel event
     * @type {number}
     */
    var index = 0, //counter
        range = 3, //number of fired events to next slide
        nowScrolling = false;

    function scrollOn() {
        var direction,
            scrollObj = $(document).add('body');
        scrollObj.on('mousewheel', function(event, delta, deltaX, deltaY) {
            event.stopPropagation();
            if (!nowScrolling) {
                index++;
                if (index >= range) {
                    nowScrolling = true;
                    if (deltaY <= 0) {
                        direction = true;
                    } else {
                        direction = false;
                    }
                    if(deltaY != 0) {
                        nextSlide(direction);                        
                    }
                    index = 0;
                }
            }
        });

    }

    function nextSlide(direction) {
        var nextSlide,
            nextSlideID,
            activeSlide = $('#' + currentSlideName);

        winHeight = $(window).height();
        if (direction) {
            nextSlide = activeSlide.next('.slide-item');
        } else {
            nextSlide = activeSlide.prev('.slide-item');

        }
        if (nextSlide.length) {
            nextSlideID = nextSlide.attr('id');
            $('.slide-item').removeClass('active-slide-item');
            nextSlide.addClass('active-slide-item');
            if (!$('.slider-shown').length) {
                $.scrollTo('#' + nextSlideID, 300,  {
                    'axis':'y',
                    onAfter: function() {
                        nowScrolling = false;
                        currentSlideName = nextSlideID;
                    }
                });
            } else {
                nowScrolling = false;
            }
        } else {
            nowScrolling = false;
        }
    }
        resizeHeights();
        events();
        if (isMobileDevice) {
            $('.arrrows-link').hide();
            $('.slide-item').css({
                width: 768 + 'px',
                property2: 1024 + 'px'
            });
        }

})