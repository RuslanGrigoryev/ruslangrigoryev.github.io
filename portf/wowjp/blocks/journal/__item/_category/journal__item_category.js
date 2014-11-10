define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');

	var JournalItemCategoryView = Backbone.Marionette.View.extend({
		duration: 300,
		moreHeight: 0,
		ui: {
			moreButton: '.list_category__more',
			lessButton: '.list_category__turn',
			moreSet: '.list_pull-down'
		},
		events: {
			'click .list_category__more': 'more',
			'click .list_category__turn': 'less'
		},
		initialize: function() {
			this.bindUIElements();
			this.moreHeight = this.ui.moreSet.height()-16;
		},
		more: function() {
			var that = this;
			this.ui.moreButton.hide();
			this.ui.moreSet.css({
				height: 0,
				display: 'block'
			});
			
			this.ui.moreSet.animate({
				height: this.moreHeight + this.ui.moreButton.height()/2
			}, {
				duration: this.duration
			});

			this.ui.lessButton.show();
		},
		less: function() {
			var that = this;
			this.ui.lessButton.hide();
			
			this.ui.moreSet.animate({
				height: 0
			}, {
				complete: function() {
					that.ui.moreSet.css({
						display: 'none',
						height: that.moreHeight
					})
				},
				duration: this.duration
			});

			this.ui.moreButton.show();
		}
	});

	return JournalItemCategoryView;
});