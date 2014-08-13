$(function() {
	
    $('.anim').show().addClass('fadeIn animated');
    /*Main slider*/
    $("#slider").find(".item:gt(0)").hide();

    setInterval(function() { 
      $('#slider').find(".item:first")
        .fadeOut(2000)
        .next()
        .fadeIn(2000)
        .end()
        .appendTo('#slider');
    },  6000);


    /*Slide punkts on page how_it_works_2*/

    var $items = $('.punkt-list__item'),
        $links = $items.find('.punkt-list__wrap-text'),
        $texts = $items.find('.punkt-list__item--inner');

    $links.on('click', function(e) {
    	e.preventDefault();
        var $this = $(this),
            $text = $this.next(),
            $parent = $this.closest('li');
    	$texts.not($text).slideUp(1000);
    	$text.stop(true, false).slideToggle(1000)
        $items.not($parent).removeClass('punkt-list__item--inner--active');
        $parent.toggleClass('punkt-list__item--inner--active');
    });


    /*Slide item on solutions2.html*/

    var $clientsLink       = $('.clients-link'), 
        $clientsLinkInner  = $('.clients-link--inner'),
        $open              = false;

        $clientsLink.on('click', function (e) {
            e.preventDefault();

            var $self          = $(this),
                $currDataInner = $self.data('inner');


            $('.clients-link--inner').each(function( index ) {
                var $temp = $(this).data('inner');
                if ($temp == $currDataInner) {
                    $clientsLinkInner.not($(this)).hide();
                    $clientsLink.not($self).removeClass('punkt-list__link--active');
                    $(this).slideToggle();
                    $self.toggleClass('punkt-list__link--active');
                }
            });
        });

        /*SLIDESHOW PORTFOLIO_ WORKS*/
        if ($('.slideshow-works').length) {
            $('.slideshow-works').slick({
              centerMode: true,
                centerPadding: '220px',
                slidesToShow: 5
            });

        }

            /*SLIDESHOW RELATED WORKS*/
        if ($('.slideshow-works__related').length) {

            $('.slideshow-works__related').slick({
              slidesToShow: 6,
              slidesToScroll: 1,
              autoplay : true,
              autoplaySpeed: 3000,
              arrows   : false,
              dots     : false
            });

        }

         if ($('.slideshow__slick').length) {

          $('.slideshow__slick').slick({
            autoplay: true
          });
        }

        /*POPUP STYLES*/
         $('#mask').on('click', function(e) {
            console.log(e.target);            
            unloadPopupBox();
        });
        
        $('#popup_btn').on('click', function(e) {
            e.preventDefault();
            loadPopupBox();
            $('.hiddenInput').val('Center form (Main page button)');
        });
        $('.footer-phone').on('click', function(e) {
            e.preventDefault();
            loadPopupBox();
            $('.hiddenInput').val('Footer form(bottom phone logo)');
        });

        function unloadPopupBox() {    // TO Unload the Popupbox
            $('.popup').fadeOut("fast");
        }    
        
        function loadPopupBox() {    // To Load the Popupbox
            $('.popup').fadeIn("fast");       
        }       

        $('#moreLink').on('click', function(event) {
            event.preventDefault();
            return false;
        }); 

        $('#submitBtn').on('click', function (event) {
            var nameVal = $('#name').val(),
                mailVal = $('#mail').val();
            console.log($('#name').val() + ' --- ' + $('#mail').val());

            if (nameVal === '' || mailVal === '' ) {
                /*$('.warning').show();*/
                
            }
            else {
                unloadPopupBox();
            }
        });

        if ($(".punkt-list__item--inner--active--slide").length) {
            var offset    = $(".punkt-list__item--inner--active--slide").offset(),
                offsetTop = offset.top;

            $("html, body").animate({ scrollTop: offsetTop }, "slow");
        }
        
        $('.portfolio-works .slick-slide').find('a').on('click', function () {
            return false;
        });
});

