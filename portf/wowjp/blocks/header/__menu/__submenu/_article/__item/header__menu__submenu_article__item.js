define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		HeaderMenuSubmenuArticleItemTemplate = require('textblock!header/__menu/__submenu/_article/__item.html');

	var HeaderMenuSubmenuArticleItem = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: _.template(HeaderMenuSubmenuArticleItemTemplate)
	});

	return HeaderMenuSubmenuArticleItem;
});