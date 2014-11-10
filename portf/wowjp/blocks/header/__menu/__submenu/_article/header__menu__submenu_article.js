define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ArticleCategoryModel = require('models/article/category'),
		HeaderMenuSubmenuArticleItem = require('block!header/__menu/__submenu/_article/__item');

	var HeaderMenuSubmenuArticleList = Backbone.Marionette.CollectionView.extend({
		childView: HeaderMenuSubmenuArticleItem
	});

	var HeaderMenuSubmenuArticle = Backbone.Marionette.View.extend({
		isRendered: false,
		isActive: false,
		pause: 250,
		collection: null,
		ui: {
			list: '.header__menu__submenu__content'
		},
		events: {
			'mouseover': 'show',
			'mouseleave': 'hide'
		},
		initialize: function() {
			var that = this;
			this.bindUIElements();

			this.model = new ArticleCategoryModel({
				id: this.$el.data('id')
			});
		},
		render: function() {
			var list = new HeaderMenuSubmenuArticleList({
				el: this.ui.list,
				collection: this.collection
			});
			list.render();

			this.ui.list.removeClass('loader');
		},
		show: function() {
			var that = this;

			if (!this.isRendered) {

				setTimeout(function() {
					if(!that.isActive) {
						return false;
					}

					that.model.getArticles({
						data: {
							':select': ['id', 'url', 'title', 'smallImageUrl'].join(',')
						},
						success: function(collection) {
							that.collection = collection;
							that.isRendered = true;
							that.render();
						},
						error: function() {
							that.isRendered = true;
							that.render();
						}
					});
				}, this.pause);
			}

			this.isActive = true;
		},
		hide: function() {
			this.isActive = false;
		}
	});

	return HeaderMenuSubmenuArticle;
});