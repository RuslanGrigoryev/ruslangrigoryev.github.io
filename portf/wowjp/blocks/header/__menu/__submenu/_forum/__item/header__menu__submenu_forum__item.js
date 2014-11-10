define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		HeaderMenuSubmenuForumItemTemplate = require('textblock!header/__menu/__submenu/_forum/__item.html'),
		TemplateDateHelper = require('helpers/templateDate');

	var HeaderMenuSubmenuForumItem = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: _.template(HeaderMenuSubmenuForumItemTemplate),
		templateHelpers: {
			postDate: TemplateDateHelper
		}
	});

	return HeaderMenuSubmenuForumItem;
});