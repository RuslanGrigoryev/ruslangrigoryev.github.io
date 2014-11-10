define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		MessagingAnswerTemplate = require('textblock!messaging/__answer.html'),
		SmilesView = require('block!smiles'),
		PrivateMessageModel = require('models/privateMessage'),
		Notice = require('block!notice'),
		Keys = require('helpers/keys'),
		timestamp = require('helpers/timestamp');

	var MessagingAnswerView = Backbone.Marionette.ItemView.extend({
		template: _.template(MessagingAnswerTemplate),
		initialize: function(options) {
			if(_.isUndefined(options)) {
				options = {};
			}

			this.options = options;

			this.smiles = new SmilesView();
			this.childViewOptions = {
				parent: this
			};
		},
		ui: {
			'input': 'textarea'
		},
		events: {
			'click .button_smile': 'toggleSmiles',
			'click .messaging__answer__right .button_red': 'submit',
			'keydown textarea:eq(0)': 'hotKeySubmit',
		},
		onRender: function() {
			var that = this;

			this.smiles.setProperty('parentEl', this.$el.find('.messaging__answer__center'));
			this.smiles.setProperty('inputEl', this.$el.find('.messaging__answer__center textarea'));

			$('body').click(function() {
				that.outsideClick.apply(that);
			});
		},
		outsideClick: function() {
			this.smiles.hide();
		},
		toggleSmiles: function(e) {
			if (!this.smiles.isRendered) {
				this.smiles.render();
			}

			if (this.smiles.isOpened) {
				this.smiles.hide();
			} else {
				this.smiles.show();
			}

			e.stopPropagation();
			return false;
		},
		submit: function() {
			var that = this;
			var model = new PrivateMessageModel({
				message: this.ui.input.val(),
				onCreated: timestamp(),
				sender_id: App.currentUser.get('id'),
				receiver_id: this.options.sender_id
			});
			model.on('invalid', function(m, e) {
				Notice({
					layout: 'bottomRight',
					text: e
				});
				that.ui.input.val(model.get('message'));
			});

			model.setSyncAttributes(['message', 'receiver_id']);
			model.save(null, {
				success: function() {
					that.options.parent.ListRegion.currentView.update(0);
				},
				error: function() {
					Notice({
						layout: 'bottomRight',
						text: 'Ошибка во время сохранения'
					});
					that.ui.input.val(model.get('message'));
				}
			});
			model.clearSyncAttributes();

			this.ui.input.val('');
		},
		hotKeySubmit: function(e) {
			if(e.keyCode == Keys.ENTER && e.ctrlKey) {
				this.submit();
				e.stopPropagation();
				return false;
			}
		}
	});

	return MessagingAnswerView;
});