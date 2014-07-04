$(function () {
	var leftList   = $('.left-menu__list'),
	    langLink   = $('.lang-menu__link'),
	    widgetLink = $('.widget-head-link'),
	    viewLink   = $('.bar-view__link');

	/*LEFT SIDEBAR MENU*/
	leftList.on('click', function (e) {
		e.preventDefault();
		var self = $(this);
		if (!self.hasClass('left-menu__list--empty')) {
			leftList.removeClass('left-menu__list--active');
			self.toggleClass('left-menu__list--active');
		}
		if (self.find('.left-menu__sub-menu').length) {
			self.find('.left-menu__sub-menu').slideToggle('1000');
		}
		else { 
			$('.left-menu__sub-menu').slideUp('500');
		}
	});
	/*LANG HORISONTAL MENU*/
	langLink.on('click', function (e) {
		e.preventDefault();
		var langList = $('.lang-menu__list');
		langList.removeClass('lang-menu__list--active')
		$(this).closest('.lang-menu__list').toggleClass('lang-menu__list--active');
	});

	/*CUSTOM SELECT*/
	$('select').each(function(){
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
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
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

	/*CUSTOM INPUT FILE*/
	if ($('#upload').length) {
		document.querySelector("#upload").addEventListener("click", function() {
		  var clickEvent = document.createEvent('MouseEvents');
		  
		clickEvent.initMouseEvent('click', true, true, window,
		    0, 0, 0, 0, 0, false, false, false, false, 0, null);
		  document.querySelector("#actual-upload").dispatchEvent(clickEvent);
		});
	}
	/*RIGHT WIDGET PANEL TOGGLE HEADER*/
	widgetLink.on('click', function (e) {
		e.preventDefault();
		var self = $(this);
		self.next('.wrap-widget').slideToggle('1000');
		self.find('.widget-header').toggleClass('widget-header-active');
	});
	$('.categories__tab-link').on('click', function (e) {
		e.preventDefault();
		$('.categories__tab-link').removeClass('categories__tab-link--active');
		$(this).toggleClass('categories__tab-link--active');
	});
	$('.tag-close-link').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.tag').remove();
	});
	/*ADMIN POSTS BAR VIEW*/

	viewLink.on('click', function (e) {
		e.preventDefault();
		var self = $(this);
		if (self.hasClass('bar-view__link-line')) {
			$('.bar-view__link-row').removeClass('bar-view__link-row--active');
			self.toggleClass('bar-view__link-line--active');
		}
		else {
			$('.bar-view__link-line').removeClass('bar-view__link-line--active');
			self.toggleClass('bar-view__link-row--active');
		}
	});
});