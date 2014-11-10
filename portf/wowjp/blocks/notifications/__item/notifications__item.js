define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		NotificationTemplate = require('textblock!notifications/__item.html');

	var NotificationsItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		className: 'notifications__item',
		template: _.template(NotificationTemplate),
	});

	return NotificationsItemView;
});