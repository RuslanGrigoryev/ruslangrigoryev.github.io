define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		SmileModel = require('models/smile');

	var SmilesCollection = Backbone.Collection.extend({
		model: SmileModel,
		url: '/ajax/smile/list'
	});

	return SmilesCollection;

});