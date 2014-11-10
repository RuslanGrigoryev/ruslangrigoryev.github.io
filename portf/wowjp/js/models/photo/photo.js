define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		LikeModel = require('models/like');

	var ArticleModel = Backbone.Model.extend({
		url: '/ajax/photo',
		defaults: {
			"isFullPhoto": 1,
			"viewsCount": 0,
			"commentsCount": 0,
			"likesCount": 0,
			"sharesCount": 0,
			"isCommentsAllowed": 1,
			"photoId": null,
			"extension": null,
			"url": null,
			"title": null,
			"description": null,
			"onCreated": null,
			"size": null,
			"width": null,
			"height": null,
			"onUpdated": null,
			"onPublished": null,
			"category_id": null,
			"author_id": null,
			"publisher_id": null,
			"updater_id": null
		},
		like: function() {
			var like = new LikeModel({
				module_id: LikeModel.Module.Photo,
				entry_id: this.get('id')
			});
			like.save();
			this.set('isLiked', true);
		},
		dislike: function() {
			var like = new LikeModel({
				module_id: LikeModel.Module.Photo,
				entry_id: this.get('id')
			});
			like.destroy();
			this.set('isLiked', false);
		}
	});

	return ArticleModel;
});