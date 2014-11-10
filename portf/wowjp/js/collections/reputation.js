define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ReputationModel = require('models/reputation');

	var ReputationCollection = Backbone.Collection.extend({
		model: ReputationModel,
		url: '/ajax/reputation/list',
		comparator: function(model) {
			return model.get('onCreated');
		}
	});

	return ReputationCollection;

});