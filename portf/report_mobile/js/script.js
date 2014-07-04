$(function () {
	  // Set a timeout...
	  setTimeout(function(){
	    // Hide the address bar!
	    window.scrollTo(0, 1);
	  }, 0);

/*COMMON MENU*/

   function initMenu () {
      $('.search-box,.menu' ).hide();   
      $('.search-block').on('click', function(){	
      	$(this).toggleClass('active'); 	
      	$('.search-box').toggle();
         $('.opts-menu, .menu').hide();		
      	$('.opts-block, .menu-mobile-list').removeClass('active');
      });
      $('.menu-mobile-list').on('click', function(){
      	$(this).toggleClass('active');      			
      	$('.menu').toggle();
         $('.opts-menu, .search-box').hide();
      	$('.options li').removeClass('active'); 		
      });
      $('.content').on('click', function(){
      	$('.search-box,.menu, .opts-menu' ).hide();
      	$('.opts-block, .search-block, .menu-mobile-list').removeClass('active');
      });
      $('.opts-block').on('click', function () {
         $(this).toggleClass('active');
         $('.opts-menu').toggle();
         $('.search-box, .menu').hide();
         $('.search-block, .menu-mobile-list').removeClass('active');
      });
   }

/*STAR RATINGS*/

   function voteRatingStar () {
      $('.share-block__rating-star').on('click', function (e) {
         e.preventDefault();
         $(this).toggleClass('rating-star--starred');
       });
      $('.share-social__link').on('click', function (e) {
         e.preventDefault();
         $(this).toggleClass('active');
      });
   }

/*CUSTOM SELECT*/

   function customSelect () {
      $('.wrap-inputs select').each(function(){
             var $this = $(this), numberOfOptions = $(this).children('option').length;
           
             $this.addClass('select-hidden'); 
             $this.wrap('<div class="select"></div>');
             $this.after('<div class="select-styled"></div>');

             var $styledSelect = $this.next('div.select-styled');
             $styledSelect.text($this.children('option').eq(0).text());
           
             var $list = $('<ul />', {
                 'class': 'select-options'
             }).insertAfter($styledSelect);
           
             for (var i = 0; i < numberOfOptions; i++) {
                  var text = $this.children('option').eq(i).text().split(" ");
                 $('<li />', {
                     html: text[0],
                     rel: $this.children('option').eq(i).val()
                 }).appendTo($list);
             }
           
             var $listItems = $list.children('li');
           
             $styledSelect.click(function(e) {
                 e.stopPropagation();
                 $('div.select-styled.active').each(function(){
                     $(this).removeClass('active').next('ul.select-options').hide();
                 });
                 $(this).toggleClass('active').next('ul.select-options').toggle();
             });
           
             $listItems.click(function(e) {
                 e.stopPropagation();
                 $styledSelect.text($(this).text()).removeClass('active');
                 $this.val($(this).attr('rel'));
                 $list.hide();
                 //console.log($this.val());
             });
           
             $(document).click(function() {
                 $styledSelect.removeClass('active');
                 $list.hide();
             });
         });
   }

/*SLIDE WEATHER*/
      var slideWidth      = $('.weather-date__list').width(),
          slider          = $('.weather-date'),
          sliderUl        = $('.weather-date__slider');

   function slideWeather () {
      /*slider weather*/
      
      $('.weather-date__list:last-child').prependTo(sliderUl);

      $('.weather-date__arrow--left').click(function (e) {
          e.preventDefault();
          moveLeft();
      });

      $('.weather-date__arrow--right').click(function (e) {
          e.preventDefault();
          moveRight();
      });
   }

   function moveLeft() {
       sliderUl.animate({
           left: + slideWidth
       }, 200, function () {
           $('.weather-date__list:last-child').prependTo(sliderUl);
           sliderUl.css('left', '');
       });
   };

   function moveRight() {
       sliderUl.animate({
           left: - slideWidth
       }, 200, function () {
           $('.weather-date__list:first-child').appendTo(sliderUl);
           sliderUl.css('left', '');
       });
   };

/*IMPLEMENTATION*/
   initMenu();
   voteRatingStar();
   customSelect();
   slideWeather();
});