define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		Keys = require('helpers/keys');

	var HeaderSearchView = Backbone.Marionette.View.extend({
		isExpended: false,
		ui: {
			input: '.search__input',
			tags: '.tag'
		},
		events: {
			'click': 'expand',
			'click .header__search__icon': 'expand',
			'click .tag': 'highliteTag',
			'click .search__submit': 'submit',
			'keydown .search__input': 'keydown'
		},
		initialize: function() {
			var that = this;
			$(window).click(function() {
				that.minimize.apply(that);
			});

			this.bindUIElements();
		},
		minimize: function() {
			this.$el.removeClass('header__search_active');
			this.isExpended = false;
		},
		expand: function(e) {
			App.HeaderRegion.currentView.minimizeAll();
			this.$el.addClass('header__search_active');
			this.isExpended = true;
			e.stopPropagation();
		},
		highliteTag: function(e) {
			var $tag = $(e.currentTarget);
			$tag.toggleClass('tag_active');
		},
		submit: function() {
			if(this.isExpended) {
				var query = this.ui.input.val(),
					modules = this.getActiveTagValues();

				console.log('submit: ' + this.ui.input.val(), modules.join(', '));
			}
		},
		keydown: function(e) {
			switch (e.keyCode) {
				case Keys.ENTER: this.submit(); break;
			}
		},
		getActiveTagValues: function() {
			var list = [];

			this.ui.tags.filter(function() {
				var $this = $(this);

				if($this.hasClass('tag_active')) {
					list.push($this.data('value'));
				}
			});

			return list;
		}
	});

	return HeaderSearchView;
});