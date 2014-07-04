var URL = "ajax/sub_menu.php";
$('.sub-main-menu-list').on('mouseover', function (e) {
	$('.ajax-loading-news').empty();
	$.ajax({
		url:  URL,
		type: 'post',
		data: 'catid='+ $(e.target).closest('.sub-main-menu-list').data('ajax'), 
		success: function (data, status, xhr) {
			$('.ajax-loading-news').html(data.text);
		},
		error: function (data, status, xhr) {
			console.log(status);
		}
	});
});