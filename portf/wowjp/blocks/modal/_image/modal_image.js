define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		Notice = require('block!notice'),
		CommentsView = require('block!comments'),
		PostrowActivityView = require('block!postrow/_activity'),
		NProgress = require('nprogress');

	var ModalView = Backbone.Marionette.View.extend({
		url: '/ajax/photo/show',
		ui: {
			modalImage: '.modal_image',
			comments: '.comments',
			postrowActivity: '.postrow_activity'
		},
		events: {
			'click .modal__controls__prev': 'prev',
			'click .modal__controls__next': 'close',
			'click .modal_image__close': 'close',
			'click .modal_image__image': 'next',
			'click a[data-type=prev]': 'prev',
			'click a[data-type=next]': 'next',
			'click a[data-type=close]': 'close',
			'click .modal_image__resize': 'resize'
		},
		initialize: function() {
			var that = this;

			NProgress.start();
			$.ajax({
				url: this.url + '/' + this.model.get('id'),
				success: function() {
					that.render.apply(that, arguments);
					NProgress.done();
				},
				error: function() {
					Notice({
						layout: 'bottomRight',
						text: 'Ошибка загрузки изображения'
					});
					NProgress.done();
				}
			});
		},
		render: function(data) {
			var height = $('.modal_image').height();

			var $el = $(data);
			if($('.modal_wrapper').length>0) {

				// _.each(this.events, function(val) {
				// 	var d = val.split(' ');
				// 	$('.modal_wrapper').off(d[0], d[1]);
				// });
				$('.modal_wrapper').off('click', '.modal__controls__prev');
				$('.modal_wrapper').off('click', '.modal__controls__next');
				$('.modal_wrapper').off('click', '.modal_image__close');
				$('.modal_wrapper').off('click', '.modal_image__image');
				$('.modal_wrapper').off('click', 'a[data-type=prev]');
				$('.modal_wrapper').off('click', 'a[data-type=next]');
				$('.modal_wrapper').off('click', 'a[data-type=close]');
				$('.modal_wrapper').off('click', '.modal_image__resize');

				$('.modal_image').css({
					height: height
				}).html($el.find('.modal_image').html());

				var attributes = $el.find('.modal_image').prop("attributes");
				$.each(attributes, function() {
					if('class' != this.name) {
						$('.modal_image').attr(this.name, this.value);
					}
				})
				//debugger;
			} else {
				$('body').append($el);
				this.addOverlay();
			}

			$('.modal_image img').on('load', function() {
				$('.modal_image').css({
					height: ''
				});
			});

			//$('body').scrollTop(0);

			this.setElement($('.modal_wrapper'));
			this.undelegateEvents();
			this.unbind();
			this.bindUIElements();
			this.delegateEvents();

			this.disallowBodyScroll();

			this.postrowActivity = new PostrowActivityView({
				el: this.ui.postrowActivity
			});

			var cv = new CommentsView({
				el: this.ui.comments
			});

			this.prevId = this.ui.modalImage.attr('data-previd');
			this.nextId = this.ui.modalImage.attr('data-nextid');
		},
		addOverlay: function() {
			$('.overlay').remove();
			$('body').append('<div class="overlay overlay_black"></div>');
		},
		disallowBodyScroll: function() {
			$('body').css({
				'overflow-y': 'hidden'
			});
		},
		prev: function() {
			if(!_.isEmpty(this.prevId)) {
				App.navigate('photo/'+this.prevId);
			} else {
				this.close();
			}
		},
		next: function() {
			if(!_.isEmpty(this.nextId)) {
				App.navigate('photo/'+this.nextId);
			} else {
				this.close();
			}
		},
		close: function() {
			this.$el.remove();
			$('.overlay').remove();
			$('body').css({
				'overflow-y': ''
			});
			App.navigate('', {trigger: false})
			this.remove();
		},
		resize: function(e) {
			if(this.ui.modalImage.hasClass('modal_image_expand')) {
				this.ui.modalImage.removeClass('modal_image_expand');
			} else {
				this.ui.modalImage.addClass('modal_image_expand');
			}

			e.stopPropagation();
		}
	});

	return ModalView;
});