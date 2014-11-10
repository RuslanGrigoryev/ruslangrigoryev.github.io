define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ModalView = require('block!modal'),
		ModalConfirmTemplate = require('textblock!modal/_confirm.html');

	var ModalConfirmView = ModalView.extend({
		defaults: {
			cancelText: 'Отменить',
			confirmText: 'Подтвердить'
		},
		events: {
			'click button[type=cancel]': 'cancel',
			'click button[type=confirm]': 'confirm',
			'click .modal': 'stopProgataion',
		},
		stopProgataion: function(e) {
			e.stopPropagation();
		},
		cancel: function() {
			this.close();

			if(_.isFunction(this.options.cancel)) {
				this.options.cancel();
			}
		},
		confirm: function() {
			this.close();

			if(_.isFunction(this.options.confirm)) {
				this.options.confirm();
			}
		},
		initialize: function(options) {
			if(_.isUndefined(options)) {
				options = {};
			}

			var that = this;

			this.model = new Backbone.Model($.extend({}, this.defaults, options));

			if(!_.isUndefined(options.title)) {
				this.title = options.title;
			}

			this.content = _.template(ModalConfirmTemplate, this.model.toJSON());

			this.on('enterKey', function() {
				that.confirm.apply(that);
			});
			//this.on('escapeKey', this.cancel, this);

			this.on('escapeKey', function() {
				that.cancel.apply(that);
			});
		},
	});

	return ModalConfirmView;
});