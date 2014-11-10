define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		NotificationsView = require('block!notifications'),
		HeaderItemView = require('block!header/__item'),
		NotificationsCollection = require('collections/notifications');

	var HeaderNotificationsView = HeaderItemView.extend({
		isFetched: false,
		zindex: 5,
		duration: 100,
		ui: {
			content: '.header__item_notifications__content',
			menu: '.header__item_notifications__menu',
		},
		events: {
			'click .header__icon_notice': 'toggle',
			'click': 'click'
		},
		initialize: function() {
			HeaderItemView.prototype.initialize.apply(this, arguments);

			var that = this;
			this.collection = new NotificationsCollection();
			this.bindUIElements();
			this.delegateEvents();
		},
		click: function(e) {
			e.stopPropagation();
			return false;
		},
		toggle: function() {
			var that = this;

			if(this.isVisible) {
				this.minimize();
			} else {
				this.expand();
			}

			if(!this.isFetched) {
				this.collection.fetch({
					success: function(collection) {
						that.notificationsView = new NotificationsView({
							collection: collection
						});
						that.ui.content.html(that.notificationsView.el);
						that.ui.menu.removeClass('loader');

						that.notificationsView.render();
						that.isFetched = true;

						var fromheight = that.ui.menu.height(),
							targetheight = that.ui.menu.attr('style', 'display: block').height();

						that.ui.menu
							.height(fromheight).stop()
							.animate({
								height: targetheight
							}, {
								complete: function() {
									
								}
							});
					}
				});
			}
		}
	});

	return HeaderNotificationsView;
});