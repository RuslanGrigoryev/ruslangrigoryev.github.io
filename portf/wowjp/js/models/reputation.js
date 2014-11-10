define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		CModel = require('components/cmodel'),
		UserModel = require('models/user');

	var ReputationModel = CModel.extend({
		url: '/ajax/reputation',
		defaults: {
			"comment": null,
			"value": 0,
			"refererUrl": null,
			"onCreated": null,
			"onUpdated": null,
			"creator_id": null,
			"receiver_id": null,
			"creatorNickname": null,
			"multiplier": 0
		},
		initialize: function(attrs) {
			if(_.isUndefined(attrs)) {
				attrs = {};
			}

			var that = this;

			if (_.isUndefined(attrs.creator)) {
				this.creator = new UserModel({
					id: attrs.creator_id
				});
			}

			if (_.isUndefined(attrs.receiver)) {
				this.receiver = new UserModel({
					id: attrs.receiver_id
				});
			}
		},
		fetchCreator: function() {
			this.creator.fetch({
				success: function() {
					that.trigger('creator:success');
				},
				error: function() {
					that.trigger('creator:error');
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

			if (!this.isSaving && !_.isUndefined(this.creator) && _.isEmpty(this.syncAttributes)) {
				json.creator = this.creator.toJSON();
			}

			if (!this.isSaving && !_.isUndefined(this.receiver) && _.isEmpty(this.syncAttributes)) {
				json.receiver = this.receiver.toJSON();
			}

			return json;
		},
		validate: function(attributes) {
			if(attributes.comment.length < ReputationModel.minLength) {
				return 'Минимальное количество символов: '+ReputationModel.minLength;
			}

			if(attributes.comment.length > ReputationModel.maxLength) {
				return 'Максимальное количество символов: '+ReputationModel.maxLength;
			}

			// if(_.isEmpty(attributes.sender_id)) {
			// 	return 'Не указан отправитель';
			// }
		},
	}, {
		minLength: 2,
		maxLength: 1000,
	});

	return ReputationModel;
});