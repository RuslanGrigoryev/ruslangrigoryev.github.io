define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');

	var HeaderItemView = Backbone.Marionette.View.extend({
		isVisible: false,
		events: {
			'click': 'click'
		},
		initialize: function() {
			var that = this;

			$(window).click(function() {
				that.minimize.apply(that);
			});
		},
		click: function(e) {
			e.stopPropagation();
			return false;
		},
		minimize: function() {
			var height = this.$el.find('.header__item__content').height();
			this.$el.find('.header__item__content')
				.stop()
				.animate({
					height: 0
				}, {
					duration: this.duration,
					complete: function() {
						$(this).removeAttr('style');
					}
				});
			this.$el.find('.header__icon').removeClass('header__icon_active');

			this.isVisible = false;
		},
		expand: function() {
			App.HeaderRegion.currentView.minimizeAll();

			var height = this.$el.find('.header__item__content').removeAttr('style').height();
			this.$el.find('.header__item__content')
				.height(0).show().stop()
				.animate({
					height: height
				}, {
					complete: function() {
						
					}
				});
			this.$el.find('.header__icon').addClass('header__icon_active');

			// var zindex = 0;
			// this.$el.parents('.header__right').find('.header__item')
			// 	.add(this.$el.parents('.header__container').find('.header__search'))
			// 	.each(function() {
			// 		var z = $(this).css('z-index');
			// 		if(z > zindex) {
			// 			zindex = parseInt(z);
			// 		}
			// 	});
			// this.$el.css('z-index', zindex+1);

			this.isVisible = true;
		},
		toggle: function() {
			if(this.isVisible) {
				this.minimize();
			} else {
				this.expand();
			}
		}
	});

	return HeaderItemView;
});