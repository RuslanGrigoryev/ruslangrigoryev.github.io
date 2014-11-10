define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ArticleCategoryModel = require('models/article/category');

	var ArticleCategoriesCollection = Backbone.Collection.extend({
		model: ArticleCategoryModel,
		url: '/ajax/articleCategory/list'
	});

	return ArticleCategoriesCollection;
});