define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ArticlesCollection = require('collections/article/articles');

	var ArticleCategoryModel = Backbone.Model.extend({
		url: '/ajax/articleCategory',
		defaults: {
			"position": null,
			"elementsCount": null,
			"isNews": null,
			"url": null,
			"name": null,
			"description": null,
			"tags": null,
			"thumbImageUrl": null,
			"childCategories": null,
			"parent_id": null
		},
		initialize: function(attrs) {
			if (!_.isUndefined(attrs.parent)) {
				this.unset('parent');

				if (!_.isEmpty(attrs.parent)) {
					this.parent = new ArticleCategoryModel(attrs.parent);
				}
			}
		},
		getArticles: function(opts) {
			var defaults = {
				data: {},
				success: function() {},
				error: function() {}
			};

			if (!_.isUndefined(opts.data)) {
				opts.data = $.param($.extend({
					category_id: this.get('id')
				}, opts.data));
			}

			var sets = $.extend({}, defaults, opts);

			new ArticlesCollection().fetch(sets);
		}
	});

	return ArticleCategoryModel;
});