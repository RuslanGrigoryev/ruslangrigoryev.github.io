define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		CommentModel = require('models/comment');

	var CommentsCollection = Backbone.Collection.extend({
		model: CommentModel,
		url: '/ajax/comment/list',
		defaultCount: 10
	});

	return CommentsCollection;

});