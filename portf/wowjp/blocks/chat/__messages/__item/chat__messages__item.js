define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ChatMessagesItemTemplate = require('textblock!chat/__messages/__item.html'),
		timeConverter = require('helpers/timeConverter'),
		ConfirmModal = require('block!modal/_confirm'),
		nl2br = require('helpers/nl2br'),
		UserModel = require('models/user');

	var smiles;

	var ChatMessagesItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'chat__messages__item',
		template: _.template(ChatMessagesItemTemplate),
		templateHelpers: {
			timeConverter: timeConverter,
			getSender: function(id) {
				return new UserModel({
					id: id
				});
			},
			replaceSmiles: function(message) {
				return smiles.replaceSmiles(message);
			},
			nl2br: nl2br
		},
		initialize : function (options) {
			if(_.isUndefined(smiles)) {
				smiles = this.options.parent.smiles;
			}
		},
		events: {
			'click .chat__messages__item__delete': 'deleteMessage'
		},
		deleteMessage: function() {
			var that = this;

			new ConfirmModal({
				message: 'Вы подтверждаете удаление комментария?',
				confirm: function() {
					that.model.setSyncAttributes(['id']);
					that.model.destroy();
					that.model.clearSyncAttributes();
				}
			}).show();
		}
	});

	return ChatMessagesItemView;
});