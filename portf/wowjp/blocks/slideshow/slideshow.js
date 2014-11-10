define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');
		require('jqueryplugins/swap');

	var SlideshowView = Backbone.Marionette.View.extend({
		ui: {
			'leftButton': '.slideshow__controls__buttons__left',
			'rightButton': '.slideshow__controls__buttons__right',
			'items': '.slideshow__list_item',
			'currentItem': '.slideshow__list_item:last',
			'prevItem': '.slideshow__list_item:nth-last-child(2)',
			'nextItem': '.slideshow__list_item:first',
			'button': '.slideshow__center__readmore',
			'title': '.slideshow__center__title',
			'center': '.slideshow__center',
			'list': '.slideshow__list',
			'link': '.slideshow__link'
		},
		events: {
			'click .slideshow__controls__buttons__left': 'prev',
			'click .slideshow__controls__buttons__right': 'next'
		},
		initialize: function() {
			var that = this;

			this.bindUIElements();

			if(this.$el.find('.container .list').length > 0) {
				this.on('layoutComplete', this.repositionMoveButtons, this);
				this.repositionMoveButtons();
			}
		},
		update: function($el) {
			var src = $el.data('src'),
				href = !_.isUndefined($el.attr('data-href')) ? $el.data('href') : 'javascript://',
				target = !_.isUndefined($el.attr('data-target')) ? $el.data('target') : '_self',
				button =  !_.isUndefined($el.attr('data-button')) ? $el.data('button') : false,
				title = !_.isUndefined($el.attr('data-title')) ? $el.data('title') : false;

			this.ui.link.attr('href', href);
			this.ui.link.attr('target', target);

			if(button) {
				this.ui.button.show();
				this.ui.button.text(button);
			} else {
				this.ui.button.hide();
			}
			
			if(title) {
				this.ui.title.show();
				this.ui.title.text(title);
			} else {
				this.ui.title.hide();
			}

			if($el.find('img').length < 1) {
				$el.html('<img>');
			}

			$el.find('img').attr('src', src);
		},
		repositionMoveButtons: function() {
			var interval = ($(window).width() -
				App.ContentRegion.$el.find('.container .list').width()) / 2 + parseInt(this.ui.leftButton.width())/2;
			
			this.ui.leftButton.css({
				'margin-left': interval + 'px'
			});
			this.ui.rightButton.css({
				'margin-right': interval + 'px'
			});
		},
		prev: function(e) {
			var that = this;
			e.stopPropagation();
			this.update(this.ui.prevItem);

			this.ui.currentItem.animate({
				left: '-100%'
			}, {
				duration: this.duration,
				complete: function() {
					that.ui.currentItem.removeAttr('style');
					that.ui.currentItem.detach();
					that.ui.list.prepend(that.ui.currentItem);
					that.bindUIElements();
				}
			});

			return false;
		},
		next: function(e) {
			var that = this;
			e.stopPropagation();
			this.update(this.ui.nextItem);

			this.ui.nextItem.detach();
			this.ui.currentItem.before(this.ui.nextItem);

			this.ui.currentItem.animate({
				left: '100%'
			}, {
				duration: this.duration,
				complete: function() {
					that.ui.currentItem.removeAttr('style');
					that.ui.currentItem.detach();
					that.ui.nextItem.before(that.ui.currentItem);
					that.bindUIElements();
				}
			});

			return false;
		}
	});

	return SlideshowView;
});