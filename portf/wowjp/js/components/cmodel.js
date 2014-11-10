define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');

	var CModel = Backbone.Model.extend({
		syncAttributes: null,
		allAttributes: {},
		setSyncAttributes: function(names) {
			this.syncAttributes = names;
			this.allAttributes = {};
		},
		clearSyncAttributes: function() {
			this.syncAttributes = null;
			this.attributes = this.allAttributes;
			this.allAttributes = {};
		},
		toJSON: function() {
			var that = this;

			if(_.isArray(this.syncAttributes)) {
				var newAttributes = {};

				this.allAttributes = _.clone(this.attributes);

				_.each(this.syncAttributes, function(name) {
					var value;

					switch(typeof that.attributes[name]) {
						case "boolean": value = that.attributes[name] ? 1 : 0; break;
						default: value = that.attributes[name];
					}
					
					newAttributes[name] = value;
				});

				this.attributes = newAttributes;
			}

			return Backbone.Model.prototype.toJSON.apply(this);
		},
		destroy: function(options) {
			var that = this;

			if(_.isUndefined(options)) {
				options = {};
			}

			$.ajax({
				url: this.url,
				type: 'DELETE',
				data: this.toJSON(),
				error: function() {
					if(_.isFunction(options.error)) {
						options.error();
					}
				},
				success: function() {
					that.trigger('destroy', that, that.collection, options);

					if(_.isFunction(options.success)) {
						options.success();
					}
				}
			});
		}
	});

	return CModel;

});