define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		CommentTemplate = require('textblock!comments/__item.html'),
		TemplateDateHelper = require('helpers/templateDate'),
		nl2br = require('helpers/nl2br'),
		CommentsAnswerView = require('block!comments/__field/_answer'),
		Notice = require('block!notice'),
		ModalConfirm = require('block!modal/_confirm'),
		ModalComplaint = require('block!modal/_complaint'),
		ComplaintModel = require('models/complaint'),
		Module = require('models/module'),
		Keys = require('helpers/keys');

	var smiles;

	var CommentsItemView = Backbone.Marionette.ItemView.extend({
		isEditing: false,
		tagName: 'li',
		className: 'comments__item',
		template: _.template(CommentTemplate),
		ui: {
			normal: '.comments__item__normal:eq(0)',
			edit: '.comments__item__edit:eq(0)',
			answer: '.comments__field_answer:eq(0)',
			editMessage: 'textarea:eq(0)',
			content: '.comments__item__text__content:eq(0)',
			leftPart: '.comments__item__left:eq(0)',
			submit: 'button[type=submit]:eq(0)',
			cancel: 'button[type=cancel]:eq(0)',
			controls: '.topic__item__user__controls:eq(0)',
			rate: '.comments__item__rate:eq(0)'
		},
		events: {
			'click a[data-type=answer]:eq(0)': 'toggleAnswer',
			'click a[data-type=edit]:eq(0)': 'toggleEdit',
			'click a[data-type=delete]:eq(0)': 'delete',
			'click a[data-type=complaint]:eq(0)': 'showComplain',
			'click button[type=submit]:eq(0)': 'submit',
			'click button[type=cancel]:eq(0)': 'toggleEdit',
			'keydown textarea:eq(0)': 'hotKeySubmit',
			'click .button__controls_minus:eq(0)': 'minus',
			'click .button__controls_plus:eq(0)': 'plus'
		},
		templateHelpers: {
			replaceSmiles: function(message) {
				return smiles.replaceSmiles(message);
			},
			templateDate: TemplateDateHelper,
			nl2br: nl2br
		},
		initialize: function(options) {
			var that = this;
			//this.model.on('change', this.onChange, this);
			this.model.on('invalid', this.onError, this);

			var parentId = that.model.get('parent_id');

			if(!_.isNull(parentId)) {
				var parentModel = this.options.comments.collection.find(function(model) {
					return model.get('id') == parentId
				});
				this.model.set('deps', parentModel.get('deps') + 1);
			}

			if(_.isUndefined(smiles)) {
				smiles = this.options.comments.smiles;
			}
		},
		onChange: function() {
			var that = this;
			this.model.setSyncAttributes(['id', 'message']);
			this.ui.leftPart.addClass('loader');
			this.disable();
			this.model.save(null, {
				success: function() {
					that.toggleEdit();
				},
				error: function() {
					that.onError.call(that, null, 'Ошибка сохранения');
				}
			});
			this.model.clearSyncAttributes();
		},
		onError: function(model, error) {
			Notice({
				layout: 'bottomRight',
				text: error
			});
			this.ui.leftPart.removeClass('loader');
			this.disable();
		},
		onRender: function(e) {
			this.$el.attr('data-id', this.model.get('id'));

			this.answerView = new CommentsAnswerView({
				el: this.ui.answer,
				model: App.currentUser,
				comments: this.options.comments,
				parent: this
			});
			this.answerView.render();
		},
		toggleAnswer: function(e) {
			this.ui.answer.toggle();
			e.stopPropagation();
		},
		delete: function(e) {
			var that = this;
			var confirm = new ModalConfirm({
				message: 'Вы подтверждаете удаление?',
				title: 'Удалить комментарий',
				cancelText: 'Отменить',
				confirmText: 'Подтвердить',
				confirm: function() {
					that.model.setSyncAttributes(['id']);
					that.model.destroy();
					that.options.comments.collection.remove(that.model);
					that.model.clearSyncAttributes();
				}
			});
			confirm.show();

			e.stopPropagation();
		},
		toggleEdit: function(e) {
			this.ui.normal.toggle();
			this.ui.edit.toggle();
			this.enable();
			this.ui.leftPart.removeClass('loader');
			this.isEditing = !this.isEditing;
		},
		submit: function(e) {
			var message = this.ui.editMessage.val();

			if (message == this.model.get('message')) {
				this.toggleEdit();
			} else {
				this.ui.content.html(nl2br(_.escape(message)));
				this.model.set('message', message);
				this.onChange();
			}
		},
		disable: function() {
			this.ui.editMessage.prop('disabled', true);
			this.ui.submit.prop('disabled', true);
		},
		enable: function() {
			this.ui.editMessage.prop('disabled', false);
			this.ui.submit.prop('disabled', false);
		},
		hotKeySubmit: function(e) {
			if (e.keyCode == Keys.ENTER && e.ctrlKey && this.isEditing) {
				this.submit();
			}

			if (e.keyCode == Keys.ESCAPE && this.isEditing) {
				this.toggleEdit();
			}
		},
		showComplain: function() {
			var complaint = new ComplaintModel({
				module_id: Module.Comments,
				entry_id: this.model.get('id')
			});
			var modal = new ModalComplaint({
				model: complaint
			});
			modal.show();
		},
		changeRate: function(isPositive) {
			var that = this;
			this.ui.controls.hide();
			this.model.changeRate(isPositive, {
				success: function() {
					Notice({
						layout: 'bottomRight',
						text: 'Сохранено'
					});
				},
				error: function() {
					Notice({
						layout: 'bottomRight',
						text: 'Ошибка во время сохранения'
					});
					that.ui.controls.show();
				}
			});

			var cnt = this.model.get('rateCount')*1 + (isPositive ? 1 : -1);

			this.ui.rate.html(cnt);

			if(cnt < 1) {

				if(!this.ui.rate.hasClass('comments__item__rate_negative')) {
					this.ui.rate.addClass('comments__item__rate_negative');
				}
			} else {

				if(this.ui.rate.hasClass('comments__item__rate_negative')) {
					this.ui.rate.removeClass('comments__item__rate_negative');
				}
			}
		},
		minus: function(e) {
			this.changeRate(false);
			e.stopPropagation();
		},
		plus: function(e) {
			this.changeRate(true);
			e.stopPropagation();
		}
	});

	return CommentsItemView;
});