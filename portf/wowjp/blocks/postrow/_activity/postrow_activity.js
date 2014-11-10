define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ButtonShareView = require('block!button/_share'),
		ButtonLikeView = require('block!button/_like');
		require('pluso');

	var PostrowActivityView = Backbone.Marionette.View.extend({
		ui: {
			share: '.button_share',
			like: '.button_like'
		},
		initialize: function() {
			this.bindUIElements();
			this.share = new ButtonShareView({
				el: this.ui.share
			});
			this.like = new ButtonLikeView({
				el: this.ui.like
			});
			window.pluso.start();
		},
	});

	return PostrowActivityView;
});