define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ReputationModalView = require('block!modal/_reputation/_view'),
		ReputationModalChange = require('block!modal/_reputation/_change');
		require('formstyler');

	var ProfileView = Backbone.Marionette.View.extend({
		events: {
			'click .profile__reputation .profile__info__features__current': 'showReputation',
			'click .profile__reputation .button__controls_minus': 'minusReputation',
			'click .profile__reputation .button__controls_plus': 'plusReputation',
			'click .profile__reputation .button__controls_neutral': 'neutralReputation'
		},
		initialize: function(options) {
			if(_.isUndefined(options)) {
				options = {};
			}

			this.options = options;

			this.$el.find('input, select').styler();

			this.delegateEvents();
			this.bindUIElements();
		},
		showReputation: function() {
			var modal = new ReputationModalView(this.options);
			modal.show();
		},
		minusReputation: function() {
			var modal = new ReputationModalChange(_.extend(this.options, {
				type: 'minus'
			}));
			modal.show();
		},
		plusReputation: function() {
			var modal = new ReputationModalChange(_.extend(this.options, {
				type: 'plus'
			}));
			modal.show();
		},
		neutralReputation: function() {
			var modal = new ReputationModalChange(_.extend(this.options, {
				type: 'neutral'
			}));
			modal.show();
		}
	});

	return ProfileView;
});