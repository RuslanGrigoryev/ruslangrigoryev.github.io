define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ChatMessageModel = require('models/chatMessage');

	var ChatMessagesCollection = Backbone.Collection.extend({
		model: ChatMessageModel,
		url: '/ajax/chatMessage/list',
		defaultCount: 10
	});

	return ChatMessagesCollection;

});