define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');

	var JournalItemView = Backbone.Marionette.View.extend({
		ui: {
			button1: '.journal__item_switcher__b1',
			button2: '.journal__item_switcher__b2',
			set1: '.journal__item_switcher__s1',
			set2: '.journal__item_switcher__s2',
		},
		events: {
			'click .journal__item_switcher__b1': 'toggle',
			'click .journal__item_switcher__b2': 'toggle'
		},
		initialize: function(options) {
			this.bindUIElements();
		},
		toggle: function() {
			if(this.ui.button1.hasClass('button_news_active')) {
				this.ui.button1.removeClass('button_news_active');
				this.ui.button2.addClass('button_news_active');

				this.ui.set1.hide();
				this.ui.set2.show();
			} else {
				this.ui.button2.removeClass('button_news_active');
				this.ui.button1.addClass('button_news_active');

				this.ui.set2.hide();
				this.ui.set1.show();
			}
		}
	});

	return JournalItemView;
});