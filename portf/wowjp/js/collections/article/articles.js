define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ArticleModel = require('models/article/article');

	var ArticlesCollection = Backbone.Collection.extend({
		model: ArticleModel,
		url: '/ajax/article/list'
	});

	return ArticlesCollection;
});