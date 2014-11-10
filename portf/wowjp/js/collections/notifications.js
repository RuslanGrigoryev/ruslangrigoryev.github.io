define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		NotificationModel = require('models/notification');

	var NotificationCollection = Backbone.Collection.extend({
		model: NotificationModel,
		url: '/ajax/notification/list'
	});

	return NotificationCollection;

});