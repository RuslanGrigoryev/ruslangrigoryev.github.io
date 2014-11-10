define(function(require) {
	var SidebarFriendsView = require('block!sidebar/_friends');

	var SidebarFactory = {
		init: function(options) {
			var $el = $(options.el);
			
			if($el.hasClass('sidebar_friends')) {
				return new SidebarFriendsView(options);
			}
		}
	};

	return SidebarFactory;
});