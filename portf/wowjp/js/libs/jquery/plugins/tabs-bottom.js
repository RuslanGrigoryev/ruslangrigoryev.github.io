$(document).ready(function() {	
	$(".tab_content").hide();
	$(".user-stats-tabs li:first-child").addClass("active");
	$(".tab_content:first-child").show();
	$(".user-stats-tabs li").click(function() {
		if (!$(this).hasClass("active")) {
			$(this).parent().find("li").removeClass("active");
			$(this).parent().prev().find(".tab_content").hide();
			
			var activeTab = $(this).find("a").attr("href");
			$(this).addClass("active");
			$(this).parent().prev().find(activeTab).fadeIn();
		}
		return false;
	});
});