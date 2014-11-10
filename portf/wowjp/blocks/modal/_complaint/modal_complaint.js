define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ModalConfirmView = require('block!modal/_confirm'),
		ModalComplainTemplate = require('textblock!modal/_complaint.html'),
		InputSelect = require('block!input/_select'),
		Notice = require('block!notice')

	var ModalComplainView = ModalConfirmView.extend({
		ui: {
			importance: 'select[name=importance]',
			comment: 'textarea[name=comment]'
		},
		confirm: function() {
			return ModalConfirmView.prototype.confirm.apply(this, arguments);
		},
		initialize: function(options) {
			this.model.set('message', _.template(ModalComplainTemplate, this.model.toJSON()));
			options = this.model.toJSON();
			options.title = 'Заполните форму жалобы';

			var model = this.model.clone();
			ModalConfirmView.prototype.initialize.apply(this, arguments);
			this.model = model;
			this.model.on('invalid', this.onNotice, this);
		},
		onNotice: function(model, error) {
			Notice({
				layout: 'bottomRight',
				text: error
			});
		},
		onRender: function() {
			this.bindUIElements();
			new InputSelect({
				el: this.ui.importance
			});
		},
		confirm: function() {
			var that = this;

			this.model.set({
				importance: this.ui.importance.val(),
				comment: this.ui.comment.val()
			});

			this.model.setSyncAttributes(['id', 'entry_id', 'module_id', 'importance', 'comment']);
			this.model.save(null, {
				success: function() {
					that.onNotice.call(that, that.model, "Жалоба отправлена");
				},
				error: function() {
					that.onNotice.call(that, that.model, "Возникла ошибка при отправке жалобы");
				}
			});
			this.model.clearSyncAttributes();

			return ModalConfirmView.prototype.confirm.apply(that, arguments);
		}
	});

	return ModalComplainView;
});