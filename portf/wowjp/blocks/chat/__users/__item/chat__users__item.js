define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ChatUsersItemTemplate = require('textblock!chat/__users/__item.html'),
		UserModel = require('models/user');

	var ChatUsersItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		className: 'chat__users__item',
		template: _.template(ChatUsersItemTemplate),
		templateHelpers: {
			getUser: function(id) {
				return new UserModel({
					id: id
				});
			}
		}
	});

	return ChatUsersItemView;
});