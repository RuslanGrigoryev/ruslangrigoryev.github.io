define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		Isotope = require('isotope'),
		IsotopStick = require('isotope.stick'),
		JournalItemView = require('block!journal/__item'),
		JournalItemSwitcherView = require('block!journal/__item/_switcher'),
		JournalItemImageView = require('block!journal/__item/_image'),
		JournalItemCategoryView = require('block!journal/__item/_category');
		require('jqueryplugins/jquery.bridget');
		require('cookie');

	$.bridget('isotope', Isotope);

	var JournalView = Backbone.Marionette.View.extend({
		ui: {
			list: '.list',
			articleItems: '.journal__item:not(.journal__item_category, .banner_thin-border, .banner_thick-border, .journal__item banner_width25)',
			switcherItems: '.journal__item_switcher',
			imageItems: '.journal__item_image',
			categoryItems: '.journal__item_category',
		},
		render: function() {
			var that = this;

			this.bindUIElements();

			if(this.ui.articleItems.length < 1) {
				return false;
			}

			var marginParentLeft = $.cookie('journal-margin-left');
			if(marginParentLeft) {
				$(this.ui.list).parent().css('margin-left', marginParentLeft);
			}

			$(this.ui.list).isotopeStick({
				//selector for the elements with double width
				doubleWidthSelector: '.content__item_width50',
				//list container will have width, can be user for alignment
				isSetParentWidth: true,
				isMarginParentCenter: true
				// isSetWidth: true
			});

			$(this.ui.list).isotope('on', 'layoutComplete', function() {
				that.trigger('layoutComplete');
			});
			$(document).ready(function() {
				$(that.ui.list).isotope('arrange');
			});

			this.ui.articleItems.each(function() {
				var article = new JournalItemView({
					el: this
				});
			});
			this.ui.switcherItems.each(function() {
				var switcher = new JournalItemSwitcherView({
					el: this
				});
			});
			this.ui.imageItems.each(function() {
				var image = new JournalItemImageView({
					el: this
				});
			});
			this.ui.categoryItems.each(function() {
				var category = new JournalItemCategoryView({
					el: this
				});
			});
			this.on('layoutComplete', function() {
				//$.cookie('journal-margin-left', this.ui.list.parent().css('margin-left'));
				this.ui.list.removeClass('list_loading');
				this.ui.list.removeClass('loader');
			});

			return true;
		},
	});

	return JournalView;
});