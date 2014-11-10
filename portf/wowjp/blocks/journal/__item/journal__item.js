define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ArticleModel = require('models/article/article');

	var JournalItemView = Backbone.Marionette.View.extend({
		defaultOptions: {
			isRendered: true
		},
		ui: {
			title: '.journal__item__title',
			label: '.label_new',
			like: '.button_like'
		},
		events: {
			'click .button_like': 'like'
		},
		initialize: function(options) {
			var settings = $.extend({}, this.defaultOptions, options);

			if(settings.isRendered) {
				this.bindUIElements();
				this.getModelFromElement();
			}
		},
		getModelFromElement: function() {
			var model = new ArticleModel();
			model.set({
				id: this.$el.data('id'),
				isLiked: this.ui.like.hasClass('button_like_active')
			});
			this.model = model;
		},
		like: function() {
			if(this.model.get('isLiked')) {
				this.model.dislike();
				this.ui.like.removeClass('button_like_active');
			} else {
				this.model.like();
				this.ui.like.addClass('button_like_active');
			}
		}
	});

	return JournalItemView;
});