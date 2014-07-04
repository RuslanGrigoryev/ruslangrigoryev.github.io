$(".sidebar-button").on('click', function(e){
	e.preventDefault();
	$('.sidebar').toggleClass('open');
	$('.container').toggleClass('no_scroll');
	$('.sidebar').height($(window).outerHeight(true));
});
$( "#accordion" ).accordion({
	collapsible: true,
	heightStyle: "content",
	/*active: false,*/
});
$('.tab').on('click', function(e) {
		e.preventDefault();
		var curTab = $(this).attr('data-name');
		$('.tab').removeClass('active-tab');
		$(this).addClass('active-tab');
		$('.tb').removeClass('visible');
		$('.'+curTab).addClass('visible');
	});
$('.name-street').on('focus', function() {
	$(this).prev('.hiden-label').addClass('visible');
})
.on('blur', function() {	
	$(this).prev('.hiden-label').removeClass('visible');
});

$('#accordion').find('p').on('click', function(event) {
	event.preventDefault();
	$(this).toggleClass('active');
	var input = $(this).parents('div').prev('h3').find('input');
	var value = input.val();
	var tarif = $(this).text();
	var flag = value.match(tarif);
	console.log(flag)
	if($(this).hasClass('active') && !flag){
		value += tarif+' ';
		input.val(value);
	}else{
		value = value.replace(tarif,'');
		input.val(value);
	}
});
$('.close-app').on('click', function(e) {
	e.preventDefault();
	$('.app-cont').fadeOut();
	$('.main').removeClass('app');
});