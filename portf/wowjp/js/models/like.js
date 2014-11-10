define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		Module = require('models/module'),
		CModel = require('components/cmodel');

	var LikeModel = CModel.extend({
		url: '/ajax/like',
		defaults: {
			entry_id: 0,
			isShare: false,
			isPositive: true,
			module_id: 0,
			onCreated: 0
		},
		destroy: function() {
			$.ajax({
				url: this.url,
				type: 'DELETE',
				data: this.toJSON(),
			});
		}
	}, {
		Module: function() {
			return Module;
		}
	});

	return LikeModel;

});