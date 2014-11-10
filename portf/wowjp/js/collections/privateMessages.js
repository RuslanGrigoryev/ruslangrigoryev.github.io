define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		PrivateMessageModel = require('models/privateMessage');

	var PrivateMessagesCollection = Backbone.Collection.extend({
		model: PrivateMessageModel,
		url: '/ajax/privateMessage/list',
		defaultCount: 10,
		comparator: function(model) {
			return model.get('onCreated');
		}
	});

	return PrivateMessagesCollection;

});