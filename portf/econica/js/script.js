var isMobileDevice = (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);


    var noLoader = false;
    if(!noLoader){
        $('html').addClass('overflow');
        var loader = new PxLoader({noProgressTimeout:5000,statusInterval:100});
        loader.add(new PxLoaderImage('images/loader.gif', 'loader'));
        loader.add(new PxLoaderImage('images/bg.png', 'img'));
        loader.add(new PxLoaderImage('images/bg-slider.png', 'img'));
        loader.add(new PxLoaderImage('images/big-img-01.png', 'img'));
        loader.add(new PxLoaderImage('images/big-img-02.png', 'img'));
        loader.add(new PxLoaderImage('images/big-img-03.png', 'img'));
        loader.add(new PxLoaderImage('images/big-img-04.png', 'img'));
        loader.add(new PxLoaderImage('images/big-img-05.png', 'img'));
        loader.add(new PxLoaderImage('images/border.png', 'img'));
        loader.add(new PxLoaderImage('images/btn-arrow-down.png', 'img'));
        loader.add(new PxLoaderImage('images/btn-arrow-up.png', 'img'));
        loader.add(new PxLoaderImage('images/btn-begin-quiz.png', 'img'));
        loader.add(new PxLoaderImage('images/btn-finish.png', 'img'));
        loader.add(new PxLoaderImage('images/btn-next.png', 'img'));
        loader.add(new PxLoaderImage('images/btn-prev.png', 'img'));
        loader.add(new PxLoaderImage('images/close-btn.png', 'img'));
        loader.add(new PxLoaderImage('images/image-radiobutton.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-01.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-02.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-03.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-04.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-05.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-06.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-07.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-08.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-09.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-10.png', 'img'));
        loader.add(new PxLoaderImage('images/img-art-11.png', 'img'));
        loader.add(new PxLoaderImage('images/ipad.gif', 'img'));
        loader.add(new PxLoaderImage('images/label_price.png', 'img'));
        loader.add(new PxLoaderImage('images/loader.gif', 'img'));
        loader.add(new PxLoaderImage('images/loading.gif', 'img'));
        loader.add(new PxLoaderImage('images/loading_dark.gif', 'img'));
        loader.add(new PxLoaderImage('images/logo.png', 'img'));
        loader.add(new PxLoaderImage('images/nav.png', 'img'));
        loader.add(new PxLoaderImage('images/paginator-active.png', 'img'));
        loader.add(new PxLoaderImage('images/paginator-border.png', 'img'));
        loader.add(new PxLoaderImage('images/paginator-border-info.png', 'img'));
        loader.add(new PxLoaderImage('images/paginator-visited.png', 'img'));
        loader.add(new PxLoaderImage('images/thumbs-down.png', 'img'));
        loader.add(new PxLoaderImage('images/thumbs-down-active.png', 'img'));
        loader.add(new PxLoaderImage('images/thumbs-up.png', 'img'));
        loader.add(new PxLoaderImage('images/thumbs-up-active.png', 'img'));

        loader.start(['loader', 'img']);
        loader.addCompletionListener(function(e) {
            $('html').removeClass('overflow');
            document.getElementById('loader').style.display = 'none';
                $( '#carousel' ).elastislide( {
                    minItems : 2
                });

                $( '<a href="#" id="close-slider" class="close-title">Выбрать другой опрос<span class="close-btn"></span></a>' ).appendTo($('.elastislide-wrapper'));

                $('#close-slider').on('click', function ( e ) {
                    e.preventDefault();
                    $('.elastislide-wrapper').hide().addClass('invisible');
                });
                $( '.wrap-img-list' ).on('click', function (e) {
                    e.preventDefault();
                    if ( $('.wrap-img-list').hasClass('active-list') ) {
                        $('.wrap-img-list').removeClass('active-list');
                    }
                    $(this).toggleClass('active-list');
                });
                $( '#another-quiz' ).on('click', function () {
                    $('.elastislide-wrapper').show().removeClass('invisible');
                });
        });
    }
    else{
        document.getElementById('loader').style.display = 'none';
    }

$(function () {
    var preview = $('.preview-photo'),
        title;
    preview.on('click', function (e) {
        e.preventDefault();
        var thisPhoto  = $(this),
            title = thisPhoto.find('.block-photo-title');

            thisPhoto.siblings().each(function (index) {
                $(this).removeClass('active-preview');
                $(this).find('.block-photo-title').hide();
            });
            
            thisPhoto.addClass('active-preview');
            thisPhoto.find(title).show();
    });
});
if ( isMobileDevice ) {
    var winHeight = $(window).height(),
        winWidth = $(window).width(),
        body = $('body'),
        currentPopupDistance;
    $(function() {
        function events() {
            $(window).on({
                resize: function() {
                    winHeight = $(window).height();
                    changeOrientation();
                }
            });
            $(document).on('click touchstart', function(event) {
                event.stopPropagation();          
            });
            $(document).on({
                ready: function() {
                    changeOrientation();
                }
            });
        }

        function showPopup(markup) {
            $(document).off('mousewheel');
            if (markup) {
                $('.popup').html('').append(markup);
            }
            $('.wrapper').hide();
            $('.popup').fadeIn(function() {
                
                $(".popup").addClass('popup-overlay');
            });
        }
        function changeOrientation() {
            winHeight = $(window).height();
            winWidth = $(window).width();

            body.removeClass('h-orientation v-orientation');

            //horizontal orientation
            if (winWidth >= winHeight) {
                body.addClass('h-orientation');
                $(".popup").removeClass('popup-overlay');
                $('.popup').fadeOut();
                $('.wrapper').show();
                //vertical orientation
            } else {
                body.addClass('v-orientation');
                var markup = '<div class="overlay-wrap" style="top:' + currentPopupDistance + 'px;"><div class="popup-head">' +
                    '<h3></h3>' +
                    '</div>' +
                    '<div class="message">' +
                    '' +
                    '' +
                    '</div>' +
                    '<div class="button">' +
                    '' +
                    '</div></div>';
                showPopup(markup);
            }
        }
        //implementation
        events();
    });
}
$('input[type="radio"]').customInput();
$('#begin-quiz').on('click', function () {
    $(this).hide();
    $('#prev').show();
    $('#next').show();
    var paginatorList = $('.paginator-list'),
        paginatorCount = paginatorList.length,
        i = 1,
        pags = [];
    paginatorList.each(function () {
        $(this).removeClass('paginator-active paginator-visited');
    });
    for (var j = 0; j <= paginatorCount; j++) {
            pags.push($('.main-quiz-block').eq(j).attr('data-num'));
        }
    $('#next').on('click', function () {
        paginatorList.eq(i).removeClass('paginator-active')
        paginatorList.eq(i).addClass('paginator-visited');
        paginatorList.eq(i+1).addClass('paginator-active');
        i++;
        ChangeMainBlocks();
    });
    $('#prev').on('click', function () {
        paginatorList.eq(i).removeClass('paginator-active');
        paginatorList.eq(i-1).removeClass('paginator-visited');
        paginatorList.eq(i-1).addClass('paginator-active');
        i--;
        if (i < 2) {
            paginatorList.eq(i).addClass('paginator-active');
            i = 2;
        }
        ChangeMainBlocks();
    });

    function ChangeMainBlocks () {
        $('.main-quiz-block').hide();
        $('.main-quiz-block').eq(i).show();
    }
});
$('.match-link').on('click', function(e){
    e.preventDefault();
    var el = $(this),
        thumbsUp = $('.thumbs-up-link'),
        thumbsDown = $('.thumbs-down-link'),
        up = el.hasClass('thumbs-up-link');
    el.parent().siblings('.unmatch-block').toggle(!up);
    thumbsUp.add(thumbsDown).removeClass('active');    
    el.addClass('active');
});

