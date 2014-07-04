$(function() {
  var feedid,
      currentBlock,
      subMainMenu,
      scrollbtn = $('#scrollTop');
    var color_link = $('.sub-menu-palette-link');
    var current_theme = getCookie("theme") || "greyscale";
    $('body').removeClass();
    $('body').addClass("theme-" + current_theme);
      $('img.blurred').addClass('blurred-left');
      if (!$('body').hasClass('theme-greyscale')) {
        $('img').removeClass('blurred');
      }
      else {
        $('img.blurred-left').addClass('blurred');
      }
    /*palette color switch*/
    
    color_link.on('click', function ( e ) {
      e.preventDefault();
      $('body').removeClass();
      setCookie("theme", $(this).data('color'),getExpDate(10));
      $('body').addClass("theme-" + $(this).data('color'));
      if (!$('body').hasClass('theme-greyscale')) {
        $('img').removeClass('blurred');
      }
      else {
        $('img.blurred-left').addClass('blurred');
      }
    });
    /*css arrows mouseover fix*/
    /*close feed*/
    $('#btn_close_feed').on('click', function (e) {
        e.preventDefault();
    	var self = $(this);
    	self.closest('.wrap-feed').hide();
    });
    /*widget-tab-switch*/
    var news_widget = $('.news-tab-widget'),
        tab_link    = $('.news-tab-title'),
        tab_block   = $('.news-tab-block');

    tab_link.on('click', function (e) {
    	e.preventDefault();
    	var self = $(this);
    	tab_link.removeClass('news-tab-title--active');
    	tab_block.removeClass('news-tab-block--active');
    	self.addClass('news-tab-title--active');

    	if ( self.hasClass('news-tab-left') ) {
    		self.siblings('div.news-tab-left').addClass('news-tab-block--active');
    	}
    	else {
    		self.siblings('div.news-tab-right').addClass('news-tab-block--active');
    	}
    });
    /*feed*/
    $('#feed-clone').html($('#feed').html());

    var temp=0;
    $('#feed li').each(function(){
      var offset=$(this).offset(),
          offsetLeft=offset.left;
      $(this).css({'left':offsetLeft+temp});
      temp = $(this).width()+temp+40;
    });
    $('#feed').css({'width':temp+200, 'margin-left':20});
    temp = 0;
    $('#feed-clone li').each(function(){
      var offset=$(this).offset();
          offsetLeft=offset.left;
      $(this).css({'left':offsetLeft+temp});
      temp=$(this).width()+temp+40;
    });
    $('#feed-clone').css({'width':temp+200,'margin-left':temp+20});

    function abc(a,b) {  
      var marginLefta=(parseInt($("#"+a).css('marginLeft')));
      var marginLeftb=(parseInt($("#"+b).css('marginLeft')));
      if((-marginLefta<=$("#"+a).width())&&(-marginLefta<=$("#"+a).width())){
        $("#"+a).css({'margin-left':(marginLefta-1)+'px'});
      } else {
        $("#"+a).css({'margin-left':temp+10});
      }
      if((-marginLeftb<=$("#"+b).width())){
        $("#"+b).css({'margin-left':(marginLeftb-1)+'px'});
      } else {
          $("#"+b).css({'margin-left':temp+10});
      }
    }
    feedid = setInterval(function() {
        abc('feed','feed-clone');
    }, 10);
    $('.wrap-feed').on('mouseover', function () {
        clearInterval(feedid);
    });
    $('.wrap-feed').on('mouseleave', function () {
    feedid = setInterval(function() {
          abc('feed','feed-clone');
      }, 10);
    });

    $('.category-news-link').on('click', function (e) {
      $('.category-news-link').removeClass('category-news-list--active');
      $(this).addClass('category-news-list--active');
      e.preventDefault();

      var data = $(this).data('tab-link');
      $('.category-news-blocks').removeClass('category-news-blocks--active');
      $.each($('.category-news-blocks'), function(i, val) {
        if ( $(this).data('tab-block') == data) {
          $(this).addClass('category-news-blocks--active');
        }
      });
    });

    $('.share-block__rating-star').on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('rating-star--starred');
    });

    $('.ajax-loading-news').on('mouseover', function (e) {
      var 
        self    = $(this),
        target  = $(e.target),
        subMainMenu = $('.sub-main-menu-list') ;
        if ($('.ajax-news').length) {
          currentBlock = self.find('.ajax-news').data('block');
        }
        if (currentBlock) {
          console.log(currentBlock);
          subMainMenu.each( function( i, el ) {
            if ( $(el).data('ajax') == currentBlock ) {
              $('.sub-main-menu-list').removeClass('active-list-ajax');
              $(el).addClass('active-list-ajax');
            }
          });
        }
    });
    $('.ajax-loading-news').on('mouseout', function (e) {
      $('.sub-main-menu-list').removeClass('active-list-ajax');
    });

    /*Scroll Top BTN*/
    $(window).scroll(function(){
      if ($(this).scrollTop() > 200) {
           scrollbtn.fadeIn();
      } 
      else {
           scrollbtn.fadeOut();
      }
    });
     
    scrollbtn.click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

});


function getCookie(name) {
  var arrCookie = document.cookie.split("; ");
  for (var i=0; i<arrCookie.length; i++) {
    var oneCookie = arrCookie[i].split("=");
    if (name == oneCookie[0]) return unescape(oneCookie[1]);
  }
}

function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        (expires ? ";expires=" + expires : "") +
        (path ? ";path=" + path : "") +
        (domain ? ";domain=" + domain : "") +
        (secure ? ";secure" : "");
}

function getExpDate(days, hours, minutes, seconds) {
  var expDate = new Date();
  if (days) expDate.setDate(expDate.getDate() + parseInt(days,10));
  if (hours) expDate.setHours(expDate.getHours() + parseInt(hours,10));
  if (minutes) expDate.setMinutes(expDate.getMinutes() + parseInt(minutes,10));
  if (seconds) expDate.setSeconds(expDate.getSeconds() + parseInt(seconds,10));
  return expDate.toUTCString();
}