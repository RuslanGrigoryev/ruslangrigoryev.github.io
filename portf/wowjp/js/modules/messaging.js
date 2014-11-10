define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		MessagingView = require('block!messaging');

	return function(Messaging, App) {
		this.addInitializer(function(options){
			if(_.isUndefined(options)) {
				options = {};
			}

			var messaging = new MessagingView(_.extend({
				el: App.MessagingRegion.el
			}, options));
			App.ContentRegion.currentView = messaging;

			messaging.render();
		});
	};

});