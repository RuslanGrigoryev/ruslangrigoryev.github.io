define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ButtonLikeView = require('block!button/_like');

	var ButtonShareView = ButtonLikeView.extend({
		isShare: true,
		initialize: function() {
			ButtonLikeView.prototype.initialize.apply(this, arguments);
			this.likeButtonElement = this.$el.parent().find('.button_like');
		},
		click: function() {
			ButtonLikeView.prototype.click.apply(this, arguments);

			if(!this.isActive && !this.likeButtonElement.hasClass('button_active')) {
				this.likeButtonElement.addClass('button_active');
				this.likeButtonElement.find('.button__number').html(+1 + this.likeButtonElement.text()*1);
			}
		}
	});

	return ButtonShareView;
});