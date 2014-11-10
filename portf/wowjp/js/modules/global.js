define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		PhotoRouter = require('routers/photo'),
		HeaderView = require('block!header'),
		SlideshowView = require('block!slideshow'),
		CommentsView = require('block!comments');
	SidebarFactory = require('blocks/sidebar/___factory/sidebar___factory');

	return function(Global, App) {
		this.addInitializer(function() {
			new PhotoRouter();

			var header = new HeaderView({
				el: App.HeaderRegion.el
			});
			App.HeaderRegion.attachView(header);
			App.HeaderRegion.currentView = header

			var slidershow = new SlideshowView({
				el: App.SlideshowRegion.el
			});
			App.SlideshowRegion.attachView(slidershow);
			App.SlideshowRegion.currentView = slidershow;

			App.CommentsRegion.currentView = [];
			App.CommentsRegion.$el.each(function() {
				var cv = new CommentsView({
					el: this
				});
				App.CommentsRegion.currentView.push(cv);
			});

			App.SidebarsRegion.currentView = [];
			App.SidebarsRegion.$el.each(function() {
				var sb = SidebarFactory.init({
					el: this
				});
			});

			//all loaded
			var event = new CustomEvent('regirested', {
				'detail': {
					require: require
				}
			});
			document.dispatchEvent(event);
			// var evt = document.createEvent("Event");
			// evt.initEvent("regirested", true, true);
			// document.dispatchEvent(evt);
		});
	};

});