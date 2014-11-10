define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		LikeModel = require('models/like');

	var ButtonLikeView = Backbone.Marionette.View.extend({
		isShare: false,
		ui: {
			number: '.button__number'
		},
		events: {
			'click': 'click'
		},
		getNumber: function() {
			return this.ui.number.text()*1;
		},
		initialize: function() {
			this.delegateEvents();
			this.bindUIElements();
			this.model = new LikeModel({
				entry_id: this.$el.data('entryid'),
				module_id: this.$el.data('moduleid'),
				isShare: this.isShare
			});
			this.buttonShareElement = this.$el.parent().find('.button_share');
		},
		click: function() {
			this.isActive = this.$el.hasClass('button_active');
			this.model.setSyncAttributes(['id', 'entry_id', 'module_id', 'isShare']);

			if(this.isActive) {
				this.model.destroy();
				this.$el.removeClass('button_active');
				this.ui.number.html(-1 + this.getNumber());

				if(this.buttonShareElement.hasClass('button_active')) {
					this.buttonShareElement.removeClass('button_active');
					this.buttonShareElement.find('.button__number').html(-1 + this.buttonShareElement.text()*1);
				}
			} else {
				this.model.save();
				this.$el.addClass('button_active');
				this.ui.number.html(this.getNumber()+1);
			}

			this.model.clearSyncAttributes();
		}
	});

	return ButtonLikeView;
});