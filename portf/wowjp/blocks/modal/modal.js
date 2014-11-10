define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ModalTemplate = require('textblock!modal.html'),
		Keys = require('helpers/keys');

	var ModalView = Backbone.Marionette.View.extend({
		template: _.template(ModalTemplate),
		title: 'Вы подтверждаете данное действие?',
		content: '',
		addClass: [],
		stopRender: false,
		initialize: function(options) {
			if(_.isUndefined(options)) {
				options = {};
			}

			this.options = options
		},
		render: function() {
			var that = this;
			this.beforeRender();

			if(this.stopRender) {
				return;
			}

			var html = this.template({
				title: this.title,
				content: this.content
			});
			this.close();

			var $element = $(html);

			$('body').append($element)
				.find('.overlay').click(function() {
					that.close.apply(that);
				});

			this.setElement($element);
			this.$el.find('input, button').focus();
			
			this.$el.find('.modal')
				.addClass(this.addClass)
				.on('click mousewheel', function(e) {
					//e.stopPropagation();
					return false;
				});
			this.$el.find('.modal__close')
				.on('click', function() {
					that.close();
				});

			this.delegateEvents();
			this.bindUIElements();
			this.onRender();

			if(this.stopRender) {
				return;
			}

			$(document).on('keyup', function() {
				that.keyUp.apply(that, arguments);
			});
		},
		updateModal: function() {
			var that = this;
			this.beforeRender();

			if(this.stopRender) {
				return;
			}

			var html = this.template({
				title: this.title,
				content: this.content
			});

			var $modalContent = $(html).find('.modal__content');

			$('.modal__content').html($modalContent.html());

			this.$el.find('.modal').attr('class', $(html).find('.modal').attr('class'));
			this.$el.find('.modal').addClass(this.addClass);

			this.delegateEvents();
			this.bindUIElements();
			this.onRender();

			if(this.stopRender) {
				return;
			}
		},
		show: function() {
			this.render();
		},
		beforeRender: function() {

		},
		onRender: function() {

		},
		close: function() {
			$('body > .overlay').remove();
			//this.destroy();
		},
		keyUp: function(e) {
			switch(e.keyCode) {
				case Keys.ESCAPE:
					this.trigger('escapeKey');
				break;
				case Keys.ENTER:
					this.trigger('enterKey');
				break;
			}
		}
	});

	return ModalView;
});