define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		HeaderMenuSubmenuForum = require('block!header/__menu/__submenu/_forum'),
		HeaderMenuSubmenuArticle = require('block!header/__menu/__submenu/_article');

	var HeaderMenuView = Backbone.Marionette.View.extend({
		ui: {
			more: '.header__menu__item_more',
			items: '.header__menu__item:not(.header__menu__item_more)',
			submenuForumList: '.header__menu__submenu_forum  .header__menu__submenu__list > li',
			submenuArticleList: '.header__menu__submenu_article  .header__menu__submenu__list > li'
		},
		forumSubmenues: [],
		articleSubmenues: [],
		initialize: function() {
			var that = this;
			this.bindUIElements();

			this.ui.submenuForumList.each(function() {
				that.forumSubmenues.push(new HeaderMenuSubmenuForum({
					el: this
				}));
			});

			this.ui.submenuArticleList.each(function() {
				that.articleSubmenues.push(new HeaderMenuSubmenuArticle({
					el: this
				}));
			});
		}
	});

	return HeaderMenuView;
});