define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		Module = require('models/module'),
		UserModel = require('models/user'),
		CModel = require('components/cmodel'),
		LikeModel = require('models/like');

	var CommentModel = CModel.extend({
		url: '/ajax/comment',
		defaults: {
			entry_id: 0,
			message: null,
			rateCount: 0,
			createIp: '',
			onCreated: 0,
			onUpdated: 0,
			author_id: null,
			parent_id: null,
			updater_id: null,
			module_id: 0,
			authorNickname: 'Undefined',
			onAuthorAvatarUpdated: null,
			isNew: false,
			isRated: false,
			deps: 0
		},
		initialize: function(attrs) {
			if(_.isUndefined(attrs)) {
				attrs = {};
			}

			if (_.isUndefined(attrs.author)) {
				this.author = new UserModel({
					id: attrs.author_id,
					nickname: attrs.authorNickname,
					onAvatarUpdated: attrs.onAuthorAvatarUpdated
				});
			}

			if (_.isUndefined(attrs.updater)) {
				this.updater = new UserModel({
					id: attrs.updater_id
				});
			}
		},
		toJSON: function() {
			var json = CModel.prototype.toJSON.apply(this);

			if (!this.isSaving && !_.isUndefined(this.author) && _.isEmpty(this.syncAttributes)) {
				json.author = this.author.toJSON();
			}

			return json;
		},
		validate: function(attributes) {
			if(attributes.message.length < 3) {
				return 'Сообщение должно быть длиннее 3х символов';
			}

			if(_.isUndefined(attributes.module_id)) {
				return 'Не указан модуль';
			}

			if(_.isUndefined(attributes.entry_id)) {
				return 'Не указан материал';
			}
		},
		changeRate: function(isPositive, options) {
			if(_.isUndefined(isPositive)) {
				isPositive = true;
			}

			var like = new LikeModel({
				entry_id: this.get('id'),
				module_id: Module.Comments,
				isPositive: isPositive
			});

			like.setSyncAttributes(['entry_id', 'module_id', 'isPositive']);
			like.save(null, options);
			like.clearSyncAttributes();
		}
	}, {
		Module: function() {
			return Module;
		}
	});

	return CommentModel;

});