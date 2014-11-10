define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		HeaderItemView = require('block!header/__item');

	var AvatarView = HeaderItemView.extend({
		zindex: 5,
		duration: 100,
		ui: {
			menu: '.header__item_avatar__menu'
		},
		events: {
			'click .header__icon_avatar': 'toggle',
			'click': 'click'
		},
		initialize: function() {
			HeaderItemView.prototype.initialize.apply(this, arguments);

			var that = this;
			this.bindUIElements();
			this.delegateEvents();

			$(window).click(function() {
				that.minimize.apply(that);
			});
		},
		click: function(e) {
			e.stopPropagation();
			return false;
		}
	});

	return AvatarView;
});