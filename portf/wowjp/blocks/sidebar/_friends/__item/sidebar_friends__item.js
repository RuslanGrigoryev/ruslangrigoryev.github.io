define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		SidebarFriendsItemTemplate = require('textblock!sidebar/_friends/__item.html'),
		timestamp = require('helpers/timestamp'),
		config = require('json!config');

	var SidebarFriendsItemView = Backbone.Marionette.ItemView.extend({
		template: _.template(SidebarFriendsItemTemplate),
		tagName: 'li',
		templateHelpers: {
			checkOnline: function(time) {
				var t = timestamp() - config.user.onlineLag;
				return time > t;
			}
		}
	});

	return SidebarFriendsItemView;
});