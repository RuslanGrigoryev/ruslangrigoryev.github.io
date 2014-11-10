define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ForumThemeModel = require('models/forum/theme');

	var ForumThemesCollection = Backbone.Collection.extend({
		model: ForumThemeModel,
		url: '/ajax/forumTheme/list'
	});

	return ForumThemesCollection;
});