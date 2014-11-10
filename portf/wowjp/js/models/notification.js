define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		UserModel = require('models/user');

	var NotificationModel = Backbone.Model.extend({
		defaults: {
			sender_id: null,
			receiver_id: null,
			message: ''
		},
		initialize: function(attrs) {
			if(!_.isUndefined(attrs.senderShort)) {
				this.unset('senderShort');

				if(!_.isEmpty(attrs.senderShort)) {
					this.sender = new UserModel(attrs.senderShort);					
				}
			}

			if(!_.isUndefined(attrs.sender)) {
				this.unset('sender');

				if(!_.isEmpty(attrs.sender)) {
					this.sender = new UserModel(attrs.sender);					
				}
			}
		},
		toJSON: function() {
			var json = Backbone.Model.prototype.toJSON.apply(this);

			if(!_.isUndefined(this.sender)) {
				json.sender = this.sender.toJSON();
			}

			return json;
		}
	});

	return NotificationModel;

});