define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		CModel = require('components/cmodel'),
		UserModel = require('models/user');

	var PrivateMessageModel = CModel.extend({
		url: '/ajax/privateMessage',
		defaults: {
			"message": null,
			"onCreated": null,
			"sender_id": null,
			"receiver_id": null,
		},
		initialize: function(attrs) {
			if(_.isUndefined(attrs)) {
				attrs = {};
			}

			var that = this;

			if (_.isUndefined(attrs.sender)) {
				this.sender = new UserModel({
					id: attrs.sender_id
				});
			}

			if (_.isUndefined(attrs.receiver)) {
				this.receiver = new UserModel({
					id: attrs.receiver_id
				});
			}
		},
		fetchSender: function() {
			this.sender.fetch({
				success: function() {
					that.trigger('sender:success');
				},
				error: function() {
					that.trigger('sender:error');
				}
			});
		},
		fetchReceiver: function() {
			this.receiver.fetch({
				success: function() {
					that.trigger('receiver:success');
				},
				error: function() {
					that.trigger('receiver:error');
				}
			});
		},
		toJSON: function() {
			var json = CModel.prototype.toJSON.apply(this);

			if (!this.isSaving && !_.isUndefined(this.sender) && _.isEmpty(this.syncAttributes)) {
				json.sender = this.sender.toJSON();
			}

			return json;
		},
		validate: function(attributes) {
			if(attributes.message.length < PrivateMessageModel.minLength) {
				return 'Минимальное количество символов: '+PrivateMessageModel.minLength;
			}

			if(attributes.message.length > PrivateMessageModel.maxLength) {
				return 'Максимальное количество символов: '+PrivateMessageModel.maxLength;
			}

			// if(_.isEmpty(attributes.sender_id)) {
			// 	return 'Не указан отправитель';
			// }
		},
	}, {
		minLength: 2,
		maxLength: 1000,
	});

	return PrivateMessageModel;

});