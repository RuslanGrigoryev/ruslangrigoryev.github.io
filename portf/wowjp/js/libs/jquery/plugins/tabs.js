$(document).ready(function() {
	$(".tab_content").hide();
	$(".tabs li:first-child").addClass("active");
	$(".tab_content:first-child").show();
	$(".tabs li").click(function() {
		if (!$(this).hasClass("active")) {
			$(this).parent().find("li").removeClass("active");
			$(this).parent().next().find(".tab_content").hide();
			
			var activeTab = $(this).find("a").attr("href");
			$(this).addClass("active");
			$(this).parent().next().find(activeTab).fadeIn();
		}
		return false;
	});
});

