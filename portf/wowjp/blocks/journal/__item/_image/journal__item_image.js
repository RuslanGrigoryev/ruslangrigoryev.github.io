define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');

	var JournalItemImageView = Backbone.Marionette.View.extend({
		events: {
			'click .photo-popup-link': 'open'
		},
		open: function(e) {
			var $target = $(e.currentTarget);
			var url = $target.attr('href');
			location.href = /^[^#]+/.exec(location.href)[0] + '#' + url.substr(1);

			e.stopPropagation();
			return false;
		}
	});

	return JournalItemImageView;
});