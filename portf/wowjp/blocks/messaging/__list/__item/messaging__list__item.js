define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		MessagingListItemTemplate = require('textblock!messaging/__list/__item.html'),
		templateDate = require('helpers/templateDate'),
		ConfirmModal = require('block!modal/_confirm'),
		nl2br = require('helpers/nl2br'),
		UserModel = require('models/user');

	var smiles, secondUser;

	var MessagingListItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		className: 'messaging__list__item',
		template: _.template(MessagingListItemTemplate),
		templateHelpers: {
			templateDate: templateDate,
			getSender: function(id) {
				if(id == App.currentUser.get('id')) {
					return App.currentUser;
				} else {
					return secondUser;
				}
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

			if(_.isUndefined(secondUser)) {
				secondUser = this.options.parent.secondUser;
			}
		}
	});

	return MessagingListItemView;
});