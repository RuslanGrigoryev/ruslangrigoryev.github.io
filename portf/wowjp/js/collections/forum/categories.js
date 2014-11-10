define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ForumCategoryModel = require('models/forum/category');

	var ForumCategoriesCollection = Backbone.Collection.extend({
		model: ForumCategoryModel,
		url: '/ajax/forumCategory/list'
	});

	return ForumCategoriesCollection;
});