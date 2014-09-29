function initPageHeader() {
    var $containerTop = $('.header'),
        containerHeight = $containerTop.outerHeight(),
        $pageContainer = $('.wrapper'),
        pCw=$pageContainer.innerWidth();
    if ($containerTop.length) {
        var $bannerBox = $('.start_top_header');
        if ($bannerBox.length) {
            var bannerBoxOffset = $bannerBox.offset(),
                bannerBoxHeight = $bannerBox.outerHeight();
            $(window).on('scroll', _.throttle(function() { 
                if ($(document).scrollTop() > bannerBoxOffset.top+bannerBoxHeight) {
                        if (!$containerTop.is('.fixed')) {
                            $pageContainer.css({'padding-top':$containerTop.outerHeight()});
                            $containerTop.addClass('fixed').css('top',-1*containerHeight).stop(true,true).animate({'top':0},550,function(){});
                        }
                    } else {
                        if ($containerTop.is('.fixed')) {
                            $containerTop.stop(true,true).animate({'top':-1*containerHeight},100,function(){
                                $pageContainer.css({'padding-top':0});
                                $containerTop.removeClass('fixed').css({'top':0});
                            });
                        }
                    }
            }, 100));
        }
    }
}

function Arrow_Points(){
    var s = $('.b_blog ul').find('li');
    $.each(s,function(i,obj){
        var posLeft = $(obj).css('left');
        $(obj).addClass('borderclass');
        if(posLeft == '0px'){
            html = '<span class="rightCorner"></span>';
            $(obj).prepend(html);
        } 
        else {
            html = '<span class="leftCorner"></span>';
            $(obj).prepend(html);
        }
    });
}

/*init mobile menu*/
function mobileMenu () {
    var $block = $('.menu_mobile'),
        $button = $('.button_mobile'),
        $content = $('.content'),
        $logo    = $('.logo-block'),
        $buttonEnter = $('.button_enter');

    $button.on('click', function (e) {

        e.preventDefault();
        $block.height($(window).height());
        if ($('.nav').length == 1) {
            $('.nav').clone().appendTo('.menu_mobile');
            $('.button_enter').clone().prependTo('.menu_mobile');
        }

        if ( $block.hasClass('expandedMobileMenu') ) {
           $block.animate({
                right: '-270px'
            }, 500, function () {
                $block.hide(); 
            });
           $block.removeClass('expandedMobileMenu');
           $content.animate({
                left: '0px'
           }, 500);
           $logo.animate({
                left: '0px'
           }, 500);
           $(this).animate({
                right: '0px'
            }, 500);
        }
        else {
            $block.animate({
                right: '0px'
            }, 500);
            $block.show(); 

           $block.addClass('expandedMobileMenu');
           $content.animate({
                left: '-270px'
           }, 500);
            $logo.animate({
                left: '-270px'
           }, 500);

            $(this).animate({
                right: '270px'
            }, 500);
        }
    });
}

/*clone advertizor button*/

function cloneAdvButton () {

    var $btnAdv      = $('.button_main_adv'),
        $btnMaster   = $('.button_main_master');

       $btnAdv.clone().appendTo('.banner_l').addClass('button_main_adv_clone');
       $btnMaster.clone().appendTo('.banner_r').addClass('button_main_master_clone');               
}

function popup () {
    // Форма попап-окно
    $(".header").on('click','.enter_button',function(e){
        e.preventDefault();
        $('.popup_overlay').fadeIn('slow').css('display','block');
        $('#form_popup').fadeIn('slow').css('display','block');
        $('#form_popup').addClass('activePopup');
        var Mtop = -($('.activePopup').outerHeight() / 2) + 'px';
        var Mleft = -($('.activePopup').outerWidth() / 2) + 'px';
        $('.activePopup').css({
            'margin-top' : Mtop,
            'margin-left' : Mleft,
            'left' : '50%',
            'top' : '50%',
            'z-index':'999999999'
        });
    });

    $('.popup_overlay').click(function(){
    $(this).fadeOut('slow');
    $('#form_popup').fadeOut('slow');
        });

    $('.close_btn,.cancel_button').click(function(e){
        e.preventDefault();
        $('#form_popup').fadeOut().css('display','none');
        $('.popup_overlay').fadeOut('slow');
    });
}
/*Switch tabs*/
function tabsSwitch(target, block, blockClassActive, targetClassActive) {

    target.on('click', function (e) {
        e.preventDefault();

        var $targetData = $(this).data('link');

        target.removeClass(targetClassActive);
        $(this).addClass(targetClassActive);

        block.each(function () {
            /*Если атрибут у блока совпадает с атрибутом у ссылки, по которой кликнули*/
            if ( $(this).data('block') == $targetData ) {
                block.removeClass(blockClassActive);
                $(this).addClass(blockClassActive)
            }
        })

    });

}
/*Vacancy Toggle*/
function toggleBlocks () {

    var $link  = $('.vacancy__list__link'),
        $block = $('.vacancy__list__content');

        $link.on('click', function (e) {
            e.preventDefault();
            var $self = $(this);
            $self.next('.vacancy__list__content').slideToggle('slow', function () {

                $self.toggleClass('vacancy__list__link_active');

            });
        }) 
}

function ParallaxScrolling () {
    $('section[data-type="background"]').each(function(){
        var $bgobj = $(this); // создаем объект
        $(window).on('scroll', _.throttle(function() { 
            var yPos = -($window.scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент 
            // Присваиваем значение background-position
            var coords = 'center '+ yPos + 'px';
            // Создаем эффект Parallax Scrolling
            $bgobj.css({ backgroundPosition: coords });
        }, 100));
    });
}

$(document).ready(function(){
    var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
    if ($('#target').length) {
        $( "#target" ).selectmenu({width: 100});
    }
    tabsSwitch($('.vacancy__tab__item'), $('.vacancy__list'), 'vacancy__list_active', 'vacancy__tab__item_active');
    popup();
    cloneAdvButton();
    initPageHeader();
    mobileMenu();
    toggleBlocks();
    $(window).resize(initPageHeader);
    
    ParallaxScrolling();

    var $container4 = $('#section4-b');
    if ($container4.length) {
        var $baloon = $container4.find('.leads__baloon'),
            $percent = $baloon.find('.leads__baloon-percent'),
            $goodLayout = $container4.find('.good__layout'),
            $check1 = $container4.find('.good__check.c1'),
            $check2 = $container4.find('.good__check.c2'),
            $check3 = $container4.find('.good__check.c3'),
            $chartMask = $container4.find('.good__mask'),
            minValue = 1,
            maxValue = 5,
            currentValue = 1,
            baloonCurrentTop = Number($baloon.css('top').replace("px","")),
            baloonStartTop = 100,
            baloonEndTop = 14,
            baloonLenght = Math.abs(baloonStartTop)+Math.abs(baloonEndTop),
            $animatedValue = $({percentValue: minValue}),
            docScrollTop;
    
        $(window).on('scroll', _.throttle(function() { 
            $container4.each(function(){
                    var block = $(this);
                    var top = block.offset().top;
                    var bottom = block.height()+top;
                    var topOfWindow = $(window).scrollTop();
                    if ((top < topOfWindow+350) && (topOfWindow<bottom)) {
                      if ($container4.is(':visible')) {
                        $goodLayout.fadeIn(350).animate({'top':'181px'},300,function(){
                            $check1.fadeIn(250).animate({'top':'154px'},150,function(){
                                $check2.fadeIn(250).animate({'top':'154px'},150,function(){
                                    $check3.fadeIn(250).animate({'top':'154px'},150,function(){
                                        $chartMask.animate({'width':0},700,function(){});
                                        $baloon.animate({'top':'-30px'},700,function(){});
                                        $animatedValue.animate({percentValue: maxValue}, {
                                            duration: 700,
                                            step: function() {
                                                $percent.text(Math.ceil(this.percentValue));
                                            }
                                        });
                                    });
                                });
                            });
                        }).dequeue();
                    }
                }
                });
        }, 100));
    };

    var $toLoad = $('.wrapper'),
        $header = $('.header'),
        $container = $('.content'),
        $section1 = $('#section1'),
        $section2 = $('#section2'),
        $section3 = $('#section3'),
        $section4 = $('#section4'),
        $section5 = $('#section5'),
        $enterButton = $header.find('.enter_button'),
        $masterButton = $container.find('.button_main_master'),
        $adButton = $container.find('.button_main_adv'),
        $bannerLeft = $container.find('.banner_box .banner_l'),
        $bannerRight = $container.find('.banner_box .banner_r'),
        $signButton = $container.find('.banner_box .sign_button'),
        $sec1a = $section1.find('#section1-a'),
        $sec1b = $section1.find('#section1-b'),
        $sec2a = $section2.find('#section2-a'),
        $sec2b = $section2.find('#section2-b'),
        $sec3a = $section3.find('#section3-a'),
        $sec3b = $section3.find('#section3-b'),
        $sec4a = $section4.find('#section4-a'),
        $sec4b = $section4.find('#section4-b'),
        $regButton = $container.find('#section5 .button'),
        bW = $bannerLeft.innerWidth();
            sbW = $signButton.innerWidth();
            pol = Math.round(sbW/2);
            pL = bW - pol;
        posLeft = function() {
            bW = $bannerLeft.innerWidth();
            sbW = $signButton.innerWidth();
            pol = Math.round(sbW/2);
            pL = bW - pol;
        }
        $(window).resize(posLeft);

        if (isMacLike) {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom');

        }
        else {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom fixed');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom fixed');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom fixed');
        }
   /* $('.banner_l').on('mouseenter', function () {
        $bannerLeft.addClass('banner_active');
        $bannerLeft.removeClass('banner_l_inactive');
        $bannerRight.removeClass('banner_active');
        $bannerRight.addClass('banner_r_inactive');
    })

    $('.banner_r').on('mouseenter', function () {
         $bannerLeft.removeClass('banner_active');
         $bannerLeft.addClass('banner_l_inactive');
         $bannerRight.addClass('banner_active');
         $bannerRight.removeClass('banner_r_inactive');   
    })*/

    $masterButton.on('click',function(){
        $enterButton.removeClass('active_enter_button');
        $bannerLeft.addClass('banner_active');
        $bannerLeft.removeClass('banner_l_inactive');
        $bannerRight.removeClass('banner_active');
        $bannerRight.addClass('banner_r_inactive');
        $signButton.removeClass('active_sign_button');
        $sec1a.css('display','block');
        $sec1b.css('display','none');
        $sec2a.css('display','block');
        $sec2b.css('display','none');
        $sec3a.css('display','block');
        $sec3b.css('display','none');
        $sec4a.css('display','block');
        $sec4b.css('display','none');

        if (isMacLike) {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom');

        }
        else {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom fixed');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom fixed');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom fixed');
        }
        $regButton.removeClass('active_button');
    });

    $('.header').on('click','.button_main_master_2',function(){
        $enterButton.removeClass('active_enter_button');
        $bannerLeft.addClass('banner_active');
        $bannerLeft.removeClass('banner_l_inactive');
        $bannerRight.removeClass('banner_active');
        $bannerRight.addClass('banner_r_inactive');
        $signButton.removeClass('active_sign_button');
        $sec1a.css('display','block');
        $sec1b.css('display','none');
        $sec2a.css('display','block');
        $sec2b.css('display','none');
        $sec3a.css('display','block');
        $sec3b.css('display','none');
        $sec4a.css('display','block');
        $sec4b.css('display','none');
        if (isMacLike) {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom');

        }
        else {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom fixed');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom fixed');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom fixed');
        }
        $regButton.removeClass('active_button');
    });

    $adButton.on('click',function(){
        $enterButton.addClass('active_enter_button');
        $bannerLeft.removeClass('banner_active');
        $bannerLeft.addClass('banner_l_inactive');
        $bannerRight.addClass('banner_active');
        $bannerRight.removeClass('banner_r_inactive');
        $signButton.addClass('active_sign_button');
        $sec1a.css('display','none');
        $sec1b.css('display','block');
        $sec2a.css('display','none');
        $sec2b.css('display','block');
        $sec3a.css('display','none');
        $sec3b.css('display','block');
        $sec4a.css('display','none');
        $sec4b.css('display','block');
        if (isMacLike) {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom');

        }
        else {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom fixed');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom fixed');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom fixed');
        }
        $regButton.addClass('active_button');
    });

    $('.header').on('click','.button_main_adv_2',function(){
        $enterButton.addClass('active_enter_button');
        $bannerLeft.removeClass('banner_active');
        $bannerLeft.addClass('banner_l_inactive');
        $bannerRight.addClass('banner_active');
        $bannerRight.removeClass('banner_r_inactive');
        $signButton.addClass('active_sign_button');
        $sec1a.css('display','none');
        $sec1b.css('display','block');
        $sec2a.css('display','none');
        $sec2b.css('display','block');
        $sec3a.css('display','none');
        $sec3b.css('display','block');
        $sec4a.css('display','none');
        $sec4b.css('display','block');
        if (isMacLike) {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom');

        }
        else {
            $section5.css('background','url(./img/sec5_bg.jpg) no-repeat center bottom fixed');
            $('#section2').css('background','url(./img/sec2_bg.jpg) no-repeat center bottom fixed');
            $('#section3').css('background','url(./img/sec3_bg.jpg) no-repeat center bottom fixed');
        }
        $regButton.addClass('active_button');
    });

    $('input.styled').checkbox(); 
    
    if ( $('.owl-slider').length) {
        $(".owl-slider").owlCarousel({
            items   : 4,
            autoPlay: true,
            stopOnHover: true,
            navigation: true,
            navigationText : false,
            itemsDesktopSmall : [850,3],
            itemsMobile     : [600,1]
        });
    }
    

    $('.bxslider2').bxSlider({
      mode:'fade',
      controls:false
    });

    $("ul.tabs").tabs("div.panes > div",{
        effect:"fade",
        fadeOutSpeed: "slow"
    });
    
    $("ul.tabs2").tabs("div.panes2 > div",{
        fadeOutSpeed: "slow"
    });

    var dispHeight=window.innerHeight;
    if(dispHeight >850){
        $(window).on('ready',function(){
            $('.item_wrap').each(function(){
                var block = $(this);
                $(this).addClass('widthTo');
                $('.item1,.item2,.item3').addClass("fadeInScale");
            });
        });
        $adButton.on('click',function(){
            var $itemWrap = $sec1b.find('.item_wrap');
            $itemWrap.each(function(){
                var block = $(this);
                block.addClass('widthTo');
                $('.item1,.item2,.item3').addClass("fadeInScale");
            });
        });
    }
    if(dispHeight >1200){
        $(window).on('ready',function(){
            $sec2a.each(function(){
                var inter = 0;
                $(this).find('.animation2').each(function() {
                    var block = $(this);
                    setTimeout(function() {
                        block.addClass('fadeInDown');
                    }, inter*100);
                    inter++;
                });
            });
        });
        $adButton.on('click',function(){
            $sec2b.each(function(){
                $('.fis21,.fis22,.fis23,.fis24,.fis25,.fis26').addClass("fadeInScale");
            });
        });
        $(window).on('scroll', _.throttle(function() { 
            $('#section3-a').each(function(){
                var block = $(this);
                var top = block.offset().top;
                var bottom = block.height()+top;
                var topOfWindow = $(window).scrollTop();
                if ((top < topOfWindow+900) && (topOfWindow<bottom)) {
                    $('.left_slide h4,.left_slide ul li').addClass("fadeInLeft");
                    $('.right_slide').addClass("fadeInRight");
            }
        });
        }, 100));
    }
    if(dispHeight >1600){
        $('#section3-a').each(function(){
            $('.left_slide h4,.left_slide ul li').addClass("fadeInLeft");
            $('.right_slide').addClass("fadeInRight");
        });
        
    }

    // Анимация при скроллинге
    $('.scroll').each(function () {
        var block = $(this);
        $(window).on('scroll', _.throttle(function() { 
            var top = block.offset().top;
            var bottom = block.height()+top;
            top = top - $(window).height() + 200;
            var scroll_top = $(this).scrollTop();
            if ((scroll_top > top) && (scroll_top < bottom)) {
                if (!block.hasClass('animate')) {
                    block.addClass('animate');
                    block.trigger('animateIn');
                }
            }
        }, 100));
    });

    $('.item_wrap').on('animateIn', function() {
        var inter = 0;
        $(this).addClass('widthTo');
        $(this).find('.animation').each(function() {
            var block = $(this);
            setTimeout(function() {
                block.addClass('fadeInScale');
            }, inter*300);
            inter++;
        });
    });

    $('#section2').on('animateIn', function() {
        var inter = 0;
        $(this).find('.animation2').each(function() {
            var block = $(this);
            setTimeout(function() {
                block.addClass('fadeInDown');
            }, inter*100);
            inter++;
        });
    });
    
    $(window).on('scroll', _.throttle(function() { 
        $('#section3-a').each(function(){
            var block = $(this);
            var top = block.offset().top;
            var bottom = block.height()+top;
            var topOfWindow = $(window).scrollTop();
            if ((top < topOfWindow+350) && (topOfWindow<bottom)) {
                $('.left_slide h4,.left_slide ul li').addClass("fadeInLeft");
                $('.right_slide').addClass("fadeInRight");
            }
        });
    }, 100));

    $('.why1').on('animateIn', function() {
        var inter = 0;
        $(this).find('.animation').each(function() {
            var block = $(this);
            setTimeout(function() {
                block.addClass("fadeInScale");
            }, inter*300);
            inter++;
        });
    });
    $('.why2').on('animateIn', function() {
        var inter = 0;
        $(this).find('.animation').each(function() {
            var block = $(this);
            setTimeout(function() {
                block.addClass("fadeInScale");
            }, inter*300);
            inter++;
        });
    });
    
    
    $('#faq-accordion').accordion({
        canToggle: true,
        handle:'.question',
        panel:'.answer'
    });

    $('.b_blog').masonry({itemSelector : 'ul li'});
    Arrow_Points();
});