define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		MessagingTemplate = require('textblock!messaging.html'),
		MessagingListView = require('block!messaging/__list'),
		MessagingAnswerView = require('block!messaging/__answer');

	var MessagingView = Backbone.Marionette.LayoutView.extend({
		template: _.template(MessagingTemplate),
		regions: {
			AnswerRegion: '.messaging__answer',
			ListRegion: '.messaging__list'
		},
		initialize: function(options) {
			if(_.isUndefined(options)) {
				options = {};
			}

			this.options = options;
		},
		onRender: function() {
			this.ListRegion.currentView = new MessagingListView(_.extend(this.options, {
				el: this.ListRegion.el,
				parent: this
			}));
			this.ListRegion.attachView(this.ListRegion.currentView);
			this.ListRegion.currentView.render();

			this.AnswerRegion.currentView = new MessagingAnswerView(_.extend(this.options, {
				el: this.AnswerRegion.el,
				parent: this
			}));
			this.AnswerRegion.attachView(this.AnswerRegion.currentView);
			this.AnswerRegion.currentView.render();
		}
	});

	return MessagingView;
});