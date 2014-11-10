define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');
	require('formstyler');

	var SelectView = Backbone.Marionette.View.extend({
		initialize: function() {
			this.$el.styler();
		}
	});

	return SelectView;
});