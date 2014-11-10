define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		SmilesTemplate = require('textblock!smiles.html'),
		SmilesCollection = require('collections/smiles'),
		SmileModel = require('models/smile'),
		smilesList = require('json!smilesList');

	var SmilesView = Backbone.Marionette.View.extend({
		tagName: 'div',
		className: 'smiles',
		parentEl: $('body'),
		isRendered: false,
		isOpened: false,
		events: {
			'click .smiles__item': 'addSmile',
			'click': 'clickOnMe'
		},
		addSmile: function(e) {
			var $current = $(e.currentTarget);
			var text = this.inputEl.val(),
				command = $current.data('command');
			this.inputEl.val(text + command);
		},
		initialize: function(options) {
			var that = this;

			if (_.isUndefined(options)) {
				options = {};
			}

			this.options = options;

			if (this.options.parentEl) {
				this.parentEl = $(this.options.parentEl);
			}

			if (this.options.inputEl) {
				this.inputEl = $(this.options.inputEl);
			}

			this.collection = new SmilesCollection(smilesList);

			var regexpInner = this.collection.map(function(model) {
				return model.get('command').replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			}).join('|');
			this.regexp = new RegExp('(' + regexpInner + ')','gi');
		},
		setProperty: function(name, value) {
			this[name] = value;
		},
		replaceSmiles: function(text) {
			text = text.replace(this.regexp, function(match, capture) {
				return '<img class="smile" src="'+SmileModel.getImage(match)+'" />';
			});
			return text;
		},
		render: function() {
			var html = $('<' + this.tagName + '>')
				.addClass(this.className)
				.html(_.template(SmilesTemplate, {
					smiles: this.collection.toJSON()
				}));

			if (!_.isUndefined(this.parentEl)) {
				this.parentEl.append(html);
			}

			this.setElement(html);

			this.isRendered = true;
		},
		show: function() {
			this.$el.show();

			this.isOpened = true;
		},
		hide: function() {
			this.$el.hide();

			this.isOpened = false;
		},
		clickOnMe: function(e) {
			e.stopPropagation();
			return false;
		}
	});

	return SmilesView;
});