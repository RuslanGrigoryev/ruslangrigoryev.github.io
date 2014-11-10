define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		config = require('json!config');

	var SmileModel = Backbone.Model.extend({
		url: '/ajax/smile',
		defaults: {
			command: '',
			isVisibleInList: false
		},
		getImage: function() {
			return SmileModel.getImage(this.get('command'));
		},
		toJSON: function() {
			var basejson = Backbone.Model.prototype.toJSON.apply(this);
			basejson.image = this.getImage();
			return basejson;
		}
	}, {
		getImage: function(command) {
			return config.smile.path + '/' + SmileModel.getFilename(command);
		},
		getFilename: function(command) {
			var fileName = '';
			var strlen = command.length;

			for(var i=0;i<strlen;i++) {
				var c = command.charAt(i);

				if(/[A-Za-z0-9_]/.test(c)) {
					fileName += c;
				} else {
					fileName += command.charCodeAt(i);
				}
			}

			return fileName + '.png';
		},
	});

	return SmileModel;

});