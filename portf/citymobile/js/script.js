$(function(){
	var tr = $('#chooseTariff');
	$('.wrap-order-tariff, .wrap-order-options').on('click', function () {
		$(this).next('.list-tariffs').slideToggle('fast');
	});
	$('.wrap-order-tariff').next('.list-tariffs').find('li').on('click', function (){
		var currTariff = $(this).find('a').text();
		$(this).toggleClass('active');
		$(this).find('span').toggleClass('tariff-active');
			document.getElementById('chooseTariff').innerHTML += ',' + currTariff;
	});
	$('.wrap-order-options').next('.list-tariffs').find('li').on('click', function (){
		var currTariff = $(this).find('a').text();
		$(this).toggleClass('active');
		$(this).find('span').toggleClass('tariff-active');
			document.getElementById('chooseOption').innerHTML += ',' + currTariff;
	});
	$('.bottom-adv').find('.close').on('click', function () {
		$(this).closest('.bottom-adv').hide();
	});

	/*Custom select*/



	function customSelect() {
		var 
	$customSelect = $('select[data-custom="select"]'),
	  $customOption = $('select[data-custom="select"] option');

	$customSelect.each(function () {
		var $this = $(this),
			numberOfOptions = $(this).children('option').length;
		$this.addClass('s-hidden');
		$this.wrap('<div class="select"> <small class="arrow"> </small> </div>');
		$this.after('<div class="styledSelect"></div>');
		var $styledSelect = $this.next('div.styledSelect');
		$styledSelect.text($this.children('option').eq(0).text());
		var $list = $('<ul />', {
			'class': 'options'
		}).insertAfter($styledSelect);
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		var $listItems = $list.children('li');
		
		$('body').on('click', 'div.styledSelect', function (e) {
			e.stopPropagation();
			$('div.styledSelect.active').each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		$('body').on('click', 'ul.options li', function (e) {
			e.stopPropagation();
			$(this).parent().prev().text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$customOption.attr("selected", false);
			$customOption.eq($(this).index()).attr("selected", true);
			$('ul.options').hide();
			//console.log($this.val());
		});

		var _obj = $this.find('option:selected');
		if (_obj.length) {
			$styledSelect.html(_obj.text());
		}
		$(document).click(function () {
			$('div.styledSelect').removeClass('active');
			$('ul.options').hide();
		});
	});

	}

	customSelect();



	$('.wrap-order-time').find('.select').eq(0).find('.styledSelect').css({
		width: 150 + 'px'
	});
	$('.wrap-order-time').find('.select').eq(0).find('.arrow').css({
		right: -37 +'px'
	});
	$('.wrap-order-time').find('.select').eq(0).find('.options').css({
		width: 170 + 'px'
	});
	$('.wrap-order-time').find('.select').eq(1).find('.styledSelect').css({
		width: 25 + 'px'
	});
	$('.wrap-order-time').find('.select').eq(1).find('.options').css({
		width: 45 + 'px'
	});
	$('.wrap-order-time').find('.select').eq(2).find('.options').css({
		width: 45 + 'px'
	});
	$('.wrap-order-time').find('.select').eq(1).css({
		width: 25 + 'px',
		left : 50 + 'px'
	});
	$('.wrap-order-time').find('.select').eq(2).find('.arrow').css({
		right: -20 +'px'
	});
	$('.wrap-order-time').find('.select').eq(2).find('.styledSelect').css({
		width: 25 + 'px'
	});
	$('.wrap-order-time').find('.select').eq(2).css({
		width: 25 + 'px',
		left : 80 + 'px'
	});
	$('.wrap-order-time').find('.select').eq(1).find('.arrow').css({
		right: -20 +'px'
	});

	if($(window).width()<=1200) {
		$('.wrap-order-time').find('.select').eq(0).find('.styledSelect').css({
			width: 322 + 'px'
		});

		$('.wrap-order-time').find('.select').eq(0).addClass('sel2');

		$('.wrap-order-time').find('.select').eq(1).find('.styledSelect').css({
			width: 65 + 'px',
			left: 16 + 'px'
		});

		$('.wrap-order-time').find('.select').eq(2).find('.styledSelect').css({
			width: 65 + 'px',
			left:  + 'px'
		});

		$('.wrap-order-time').find('.select').eq(1).css({
			width: 88 + 'px',
			left : 50 + 'px'
		}).addClass('sel2');

		$('.wrap-order-time').find('.select').eq(2).css({
			width: 88 + 'px',
			left : 70 + 'px'
		}).addClass('sel2');

		$('.wrap-order-time').find('.select').eq(0).find('.options').css({
			width: 354 + 'px'
		});

		$('.wrap-order-time').find('.select').eq(1).find('.options').css({
				width: 98 + 'px'
			});
		$('.wrap-order-time').find('.select').eq(2).find('.options').css({
				width: 98 + 'px'
		});
		$('.wrap-order-time').find('.select').eq(0).find('.arrow').css({
			right: -46 +'px'
		});
		$('.wrap-order-time').find('.select').eq(2).find('.arrow').css({
			right: -17 +'px'
		});
		$('.wrap-order-time').find('.select').eq(1).find('.arrow').css({
			right: -17 +'px'
		});

	}


	// Change lang
	$('.lang').on('click', function () {
		$('.lang').removeClass('lang-active');
		$(this).toggleClass('lang-active');
	});
	//Dropdown list (top header)
	$('#change-city-number').on('click', function() {
		if( $('.dropdown-city').find('li').length ) {
			$(this).find('.dropdown-city').show();
		}
		else {
			return false;
		}
	});
	$('#change-city-number').find('.dropdown-city').find('li').on('click', function () {
		$('#change-city-number').find('span').html($(this).html());
		$('.dropdown-city').slideUp();
	});

	/*************personal-cabinet*************/

	$('.adr').on('click', '.close-item', function(e) {
		e.preventDefault();
		$(this).parent().hide();
	});

	$('.add-adress').on('click',  function(e) {
		e.preventDefault();
		var newAdress = $('#newStreet').val();
		if(newAdress!='') {
			$('.adr').append('<li class="in-gr-item">' + newAdress + '<a href="#" class="close-item"></a></li>');
			$('#newStreet').val('');
		}		
	});

	$("#phNum").mask("8 (999) 999-99-99");

	$('.ho-hide').on('click', function() {
		$(this).removeClass('visible');
		$('.pop-up').removeClass('visible');
	});

	$('.close-pop-up').on('click', function(e) {
		e.preventDefault();
		$('.ho-hide').removeClass('visible');
		$('.pop-up').removeClass('visible');
	});

	$('.close-action').on('click', function(e) {
		e.preventDefault();
		$('.action').fadeOut('slow');
	});

	$('.tab').on('click', function(e) {
		e.preventDefault();
		var curTab = $(this).attr('data-name');
		$('.tab').removeClass('active-tab');
		$(this).addClass('active-tab');
		$('.tb').removeClass('visible');
		$('.'+curTab).addClass('visible');
	});



	/*****************link-map*************************/


 var xref = {
		uzao: $('.air1').html(),
		uao: $('.air2').html(),
		vao: $('.air3').html(),
		bao: $('.air4').html(),
		zao: $('.air5').html(),
		szao: $('.air6').html(),
		cao: $('.air7').html(),
		sbao: $('.air8').html(),
		ubao: $('.air9').html(),
		tsao: $('.air10').html()
  };        

	
	$('#map').mapster({
	fillOpacity: 1,
	singleSelect: true,
	render_highlight: {
		altImage: '../cityMobil/i/map1.png'
	},
	render_select: {
		stroke: false,
		altImage: '../cityMobil/i/map1.png'
	},
	fadeInterval: 50,
	listKey: 'data-state',
	mapKey: 'data-state',
	onClick: function (e) {            
			
			// update text depending on area selected
			$('.air0').html(xref[e.key]);
			
			
			/*// if Asparagus selected, change the tooltip
			if (e.key === 'asparagus') {
				newToolTip = "OK. I know I have come down on the dip before, but let's be real. "
					+"Raw asparagus without any of that delicious ranch and onion dressing "
					+"slathered all over it is not so good.";
			}*/
			$('#map').mapster('set_options', { 
				areas: [{
					key: "dip"
					}]
				});
		},
	areas: [
	{
		key: 'uzao'
	},
	{
		key: 'uao'
	},
	{
		key: 'vao'
	},
	{
		key: 'bao'
	},
	{
		key: 'zao'
	},
	{
		key: 'szao'
	},
	{
		key: 'cao'
	},
	{
		key: 'sbao'
	},{
		key: 'ubao'
	},
	{
		key: 'tsao'
	}]
});

/*$('#selectCity').coreUISelect();
$('#orderDate').coreUISelect();
$('#orderTimeHours').coreUISelect();
$('#orderTimeMinutes').coreUISelect();
$('#orderTimeMinutes').coreUISelect();
$('#selectTarif').coreUISelect();*/

$('.b-core-ui-select').each(function(){
	$(this).coreUISelect();
});
$('.b-core-ui-select').on('click', function() {
	$(this).next('b-core-ui-select__dropdown').addClass('show');
})


$('.name-street').on('focus', function() {
	$(this).prev('.hiden-label').addClass('visible');
})
.on('blur', function() {	
	$(this).prev('.hiden-label').removeClass('visible');
});

$('.close-app').on('click', function(e) {
	e.preventDefault();
	$('.app-cont').fadeOut();
	$('.main').removeClass('app');
});

$('.dropdown').on('click', function(e) {
	e.preventDefault();
});

});
