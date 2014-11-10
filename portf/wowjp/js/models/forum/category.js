define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		UserModel = require('models/user'),
		ForumThemeModel = require('models/forum/theme'),
		ForumThemesCollection = require('collections/forum/themes');

	var ForumCategoryModel = Backbone.Model.extend({
		url: '/ajax/forumCategory',
		defaults: {
			"themesCount": null,
			"postsCount": null,
			"position": null,
			"depth": null,
			"isShow": 1,
			"id": null,
			"url": null,
			"name": null,
			"onCreated": null,
			"description": null,
			"lastPostThemeTitle": null,
			"lastPostUserBrief": null,
			"thumbImage": null,
			"lastPostUserNickname": null,
			"lastPostUserAvatar": null,
			"childCategories": null,
			"onLastPost": null,
			"lastTheme_id": null,
			"lastPostUser_id": null,
			"parent_id": null
		},
		initialize: function(attrs) {
			if (!_.isUndefined(attrs.lastTheme)) {
				this.unset('lastTheme');

				if (!_.isEmpty(attrs.lastTheme)) {
					this.lastTheme = new ForumThemeModel(attrs.lastTheme);
				}
			}

			if (!_.isUndefined(attrs.lastPostUser)) {
				this.unset('lastPostUser');

				if (!_.isEmpty(attrs.lastPostUser)) {
					this.lastPostUser = new UserModel(attrs.lastPostUser);
				}
			}

			if (!_.isUndefined(attrs.parent)) {
				this.unset('parent');

				if (!_.isEmpty(attrs.parent)) {
					this.parent = new ForumCategoryModel(attrs.parent);
				}
			}
		},
		getThemes: function(opts) {
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

			new ForumThemesCollection().fetch(sets);
		}
	});

	return ForumCategoryModel;
});