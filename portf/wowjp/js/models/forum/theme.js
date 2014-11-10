define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		UserModel = require('models/user'),
		ForumCategoryModel = null;

	var ForumThemeModel = Backbone.Model.extend({
		url: '/ajax/forumTheme',
		defaults: {
			"isHavePoll": null,
			"isShowSignature": 1,
			"postsCount": null,
			"readsCount": null,
			"isFixed": null,
			"isOpen": 1,
			"isShowFirstPost": null,
			"isCommentsAllowed": 1,
			"url": null,
			"name": null,
			"brief": null,
			"description": null,
			"prefix": null,
			"previewImageUrl": null,
			"onCreated": null,
			"createIp": null,
			"onLastPost": null,
			"lastPostBrief": null,
			"onUpdated": null,
			"onPublished": null,
			"onMoved": null,
			"filesData": null,
			"pollQuestion": null,
			"updateIp": null,
			"publishIp": null,
			"moveIp": null,
			"category_id": null,
			"author_id": null,
			"lastPostUser_id": null,
			"updater_id": null,
			"publisher_id": null,
			"lastPostUserNickname": null,
			"lastPostUserAvatar": null,
			"authorNickname": null,
			"authorAvatar": null
		},
		initialize: function(attrs) {
			if (!_.isUndefined(attrs.author)) {
				this.unset('author');

				if (!_.isEmpty(attrs.author)) {
					this.author = new UserModel(attrs.author);
				}
			}

			if (!_.isUndefined(attrs.lastPostUser)) {
				this.unset('lastPostUser');

				if (!_.isEmpty(attrs.lastPostUser)) {
					this.lastPostUser = new UserModel(attrs.lastPostUser);
				}
			}

			if (!_.isUndefined(attrs.updater)) {
				this.unset('updater');

				if (!_.isEmpty(attrs.updater)) {
					this.updater = new UserModel(attrs.updater);
				}
			}

			if (!_.isUndefined(attrs.publisher)) {
				this.unset('publisher');

				if (!_.isEmpty(attrs.publisher)) {
					this.publisher = new UserModel(attrs.publisher);
				}
			}

			if (!_.isUndefined(attrs.category)) {
				this.unset('category');

				if (!_.isEmpty(attrs.category)) {
					ForumCategoryModel = require('models/forum/category')
					this.category = new ForumCategoryModel(attrs.category);
				}
			}
		}
	});

	return ForumThemeModel;
});