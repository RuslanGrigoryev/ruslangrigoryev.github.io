define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		CModel = require('components/cmodel'),
		UserModel = require('models/user');

	var ComplaintModel = CModel.extend({
		url: '/ajax/chatMessage',
		defaults: {
			"senderNickname": '',
			"senderGroup_id": 1,
			"message": null,
			"onCreated": null,
			"sender_id": null
		},
		initialize: function(attrs) {
			if(_.isUndefined(attrs)) {
				attrs = {};
			}

			if (_.isUndefined(attrs.sender)) {
				this.sender = new UserModel({
					id: attrs.sender_id,
					nickname: attrs.senderNickname
				});
			}
		},
		toJSON: function() {
			var json = CModel.prototype.toJSON.apply(this);

			if (!this.isSaving && !_.isUndefined(this.sender) && _.isEmpty(this.syncAttributes)) {
				json.sender = this.sender.toJSON();
			}

			return json;
		},
		validate: function(attributes) {
			if(attributes.message.length < ComplaintModel.minLength) {
				return 'Минимальное количество символов: '+ComplaintModel.minLength;
			}

			if(attributes.message.length > ComplaintModel.maxLength) {
				return 'Максимальное количество символов: '+ComplaintModel.maxLength;
			}

			// if(_.isEmpty(attributes.sender_id)) {
			// 	return 'Не указан отправитель';
			// }
		},
	}, {
		minLength: 2,
		maxLength: 150,
	});

	return ComplaintModel;

});