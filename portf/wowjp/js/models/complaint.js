define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		UserModel = require('models/user'),
		Module = require('models/module'),
		CModel = require('components/cmodel');

	var ComplaintModel = CModel.extend({
		url: '/ajax/complaint',
		defaults: {
			"importance": 0,
			"entry_id": null,
			"onCreated": null,
			"comment": '',
			"sender_id": null,
			"module_id": null
		},
		validate: function(attributes) {
			if(attributes.comment.length < 3) {
				return 'Комментарий должен быть длиннее 3х символов';
			}

			if(_.isUndefined(attributes.module_id)) {
				return 'Не указан модуль';
			}

			if(_.isUndefined(attributes.entry_id)) {
				return 'Не указан материал';
			}
		},
	});

	return ComplaintModel;

});