define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		CommentsFieldAnswerTemplate = require('textblock!comments/__field/_answer.html'),
		CommentModel = require('models/comment'),
		Notice = require('block!notice'),
		Keys = require('helpers/keys'),
		SmilesView = require('block!smiles'),
		nl2br = require('helpers/nl2br');

	var CommentsFieldView = Backbone.Marionette.ItemView.extend({
		template: _.template(CommentsFieldAnswerTemplate),
		ui: {
			leftPart: '.comments__item__left',
			message: 'textarea[name=comment]',
			submit: 'button[type=submit]'
		},
		events: {
			'click button[type=submit]': 'submit',
			'click .button_smile': 'toggleSmiles',
			'keydown textarea': 'hotKeySubmit'
		},
		initialize: function() {
			this.smiles = new SmilesView();
		},
		onRender: function() {
			this.smiles.setProperty('parentEl', this.$el);
			this.smiles.setProperty('inputEl', this.$el.find('textarea'));
		},
		clear: function() {
			this.ui.message.val('');
		},
		submit: function() {
			var that = this;
			var comment = new CommentModel({
				message: this.ui.message.val(),
				entry_id: this.options.comments.entry_id,
				module_id: this.options.comments.module_id,
				parent_id: _.isUndefined(this.options.parent) ? null : this.options.parent.model.get('id'),
				author_id: App.currentUser.get('id'),
				onAuthorAvatarUpdated: App.currentUser.get('onAvatarUpdated'),
				authorNickname: App.currentUser.get('nickname'),
				onCreated: new Date().getTime()/1000,
				isNew: true
			});
			comment.on('invalid', function(model, error) {
				Notice({
					layout: 'bottomRight',
					text: error
				});
				that.ui.leftPart.removeClass('loader');
				that.enable();
			});

			this.ui.leftPart.addClass('loader');
			this.disable();
			this.clear();

			var newComment = _.clone(comment);
			comment.setSyncAttributes(['message', 'entry_id', 'module_id', 'parent_id']);
			comment.save(null, {
				success: function(model, id) {
					var message = newComment.get('message');
					newComment.set('id', id);
					newComment.set('message', nl2br(_.escape(message)));
					that.options.comments.collection.add(newComment.toJSON());
					that.ui.leftPart.removeClass('loader');
					that.enable();
				},
				error: function() {
					that.ui.leftPart.removeClass('loader');
					Notice({
						layout: 'bottomRight',
						text: 'Ошибка во время сохранения'
					});
					that.enable();
				}
			});
			comment.clearSyncAttributes();
		},
		hotKeySubmit: function(e) {
			if (e.keyCode == Keys.ENTER && e.ctrlKey) {
				this.submit();
			}
		},
		disable: function() {
			this.ui.message.prop('disabled', true);
			this.ui.submit.prop('disabled', true);
		},
		enable: function() {
			this.ui.message.prop('disabled', false);
			this.ui.submit.prop('disabled', false);
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
	});

	return CommentsFieldView;
});