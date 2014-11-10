define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		NotificationsItemView = require('block!notifications/__item');

	var NotificationsView = Backbone.Marionette.CollectionView.extend({
		tagName : 'ul',
		className: 'notifications',
		childView: NotificationsItemView
	});

	return NotificationsView;
});