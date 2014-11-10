define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		LikeModel = require('models/like');

	var ArticleModel = Backbone.Model.extend({
		url: '/ajax/article',
		defaults: {
			"readsCount": null,
			"likesCount": null,
			"sharesCount": null,
			"commentsCount": null,
			"isDouble": null,
			"isVideo": null,
			"isCommentsAllowed": 1,
			"isNotifyOnComments": 1,
			"url": null,
			"title": null,
			"brief": null,
			"description": null,
			"onCreated": null,
			"createIp": null,
			"updateIp": null,
			"publishIp": null,
			"isOldNews": null,
			"oldId": null,
			"videoUrl": null,
			"smallImageUrl": null,
			"innerImageUrl": null,
			"markText": null,
			"onUpdated": null,
			"onPublished": null,
			"redirectUrl": null,
			"author_id": null,
			"category_id": null,
			"publisher_id": null,
			"updater_id": null,
			"version": null
		},
		like: function() {
			var like = new LikeModel({
				module_id: LikeModel.Module.Article,
				entry_id: this.get('id')
			});
			like.save();
			this.set('isLiked', true);
		},
		dislike: function() {
			var like = new LikeModel({
				module_id: LikeModel.Module.Article,
				entry_id: this.get('id')
			});
			like.destroy();
			this.set('isLiked', false);
		}
	});

	return ArticleModel;
});