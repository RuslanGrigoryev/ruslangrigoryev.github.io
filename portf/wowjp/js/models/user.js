define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');
		GroupModel = require('models/group'),
		CModel = require('components/cmodel');

	var UserModel = CModel.extend({
		url: '/ajax/user',
		defaults: {
			nickname: '',
			onLastReputationCreated: 0,
			onAvatarUpdated: null
		},
		initialize: function(attrs) {
			if(_.isUndefined(attrs)) {
				attrs = {};
			}

			if(_.isUndefined(attrs.avatar)) {
				this.set('avatar', this.getAvatar());
			}

			if(!_.isUndefined(attrs.group)) {
				this.unset('group');

				if(!_.isEmpty(attrs.group)) {
					this.group = new GroupModel(attrs.group);
				}
			} else {
				this.group = new GroupModel();
			}
		},
		getAvatar: function() {
			var decId = this.get('id'),
				onUpdated = this.get('onAvatarUpdated');

			if(!decId) {
				return App.config.avatar.emptyAvatarFilename;
			}

			var hexIdString = decId.toString(16);

			while(hexIdString.length < 4) {
				hexIdString = '0' + hexIdString;
			}

			var path = App.config.avatar.path + '/' + hexIdString.charAt(0) +
				'/' + hexIdString.charAt(1) +
				'/' + hexIdString.charAt(2) +
				'/' + hexIdString
				+ '.png';


			if(!_.isNull(onUpdated)) {
				path += '?t=' + onUpdated;
			}

			return path;
		},
		check: function(accessName) {
			return this.group.has(accessName) && this.group.get(accessName);
		}
	});

	return UserModel;

});