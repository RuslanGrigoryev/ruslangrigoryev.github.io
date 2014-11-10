define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		HeaderMenuView = require('block!header/__menu'),
		HeaderSearchView = require('block!header/__search'),
		HeaderNotificationsView = require('block!header/__item/_notifications'),
		AvatarView = require('block!header/__item/_avatar'),
		ChatView = require('block!chat');

	var HeaderView = Backbone.Marionette.LayoutView.extend({
		regions: {
			MenuRegion: '.header__menu',
			SearchRegion: '.header__search',
			Notifications: '.header__item_notifications',
			Avatar: '.header__item_avatar',
			chatIcon: '.header__icon_chat'
		},
		ui: {
			chatIcon: '.header__icon_chat'
		},
		events: {
			'click .header__icon_chat': 'chatToggle'
		},
		initialize: function() {
			this.MenuRegion.currentView = new HeaderMenuView({
				el: this.MenuRegion.el
			});
			this.MenuRegion.attachView(this.MenuRegion.currentView);

			this.SearchRegion.currentView = new HeaderSearchView({
				el: this.SearchRegion.el
			});
			this.SearchRegion.attachView(this.SearchRegion.currentView);

			this.Notifications.currentView = new HeaderNotificationsView({
				el: this.Notifications.el
			});
			this.Notifications.attachView(this.Notifications.currentView);

			this.Avatar.currentView = new AvatarView({
				el: this.Avatar.el
			});
			this.Avatar.attachView(this.Avatar.currentView);

			//not real region
			this.ChatRegion = App.ChatRegion = {
				currentView: new ChatView()
			};
		},
		chatToggle: function(e) {
			var chatView = this.ChatRegion.currentView;
			var $current = $(e.currentTarget);

			if(!chatView.isRendered) {
				chatView.render.apply(chatView);
			}

			if(chatView.isOpened) {
				chatView.hide.apply(chatView);
				$current.removeClass('header__icon_active');

			} else {
				chatView.show.apply(chatView);
				$current.addClass('header__icon_active');
			}
		},
		minimizeAll: function() {
			this.SearchRegion.currentView.minimize();
			this.Notifications.currentView.minimize();
			this.Avatar.currentView.minimize();
		}
	});

	return HeaderView;
});