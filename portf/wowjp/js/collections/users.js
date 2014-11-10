define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		UserModel = require('models/user');

	var UsersCollection = Backbone.Collection.extend({
		model: UserModel,
		url: '/ajax/user/list'
	});

	return UsersCollection;

});