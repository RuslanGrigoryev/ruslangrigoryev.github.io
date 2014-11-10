define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ChatTemplate = require('textblock!chat.html'),
		ChatUsersView = require('block!chat/__users'),
		ChatMessagesView = require('block!chat/__messages'),
		timestamp = require('helpers/timestamp');

	var ChatView = Backbone.Marionette.View.extend({
		isRendered: false,
		isOpened: false,
		duration: 200,
		updateCircleTime: 250,
		isCollapsed: false,
		collapseDuration: 300,
		collapseExtraWait: 50,
		collapseExtraWidth: 250,
		minWindowWidth: 700,
		ui: {
			close: '.button_close',
			users: '.chat__users',
			messages: '.chat__messages'
		},
		events: {
			'click .button_close': 'hide',
			'mousewheel': 'mousewheel',
			'click .button_update': 'update',
			'click .button_collapse': 'collapseClick'
		},
		initialize: function(options) {
			var that = this;
			this.options = options;
		},
		render: function() {
			var that = this;
			var html = _.template(ChatTemplate, {});
			$('body').append(html);
			this.setElement($('body').find('#chat'));
			this.bindUIElements();
			this.delegateEvents();
			this.baseHeight = this.$el.height();
			this.isRendered = true;

			this.users = new ChatUsersView({
				el: this.ui.users
			});
			this.users.render();

			this.messages = new ChatMessagesView({
				el: this.ui.messages
			});
			this.messages.render();

			this.on('collapseIn', this.collapseIn, this);
			this.on('collapseOut', this.collapseOut, this);
			this.on('collapsed', this.collapsed, this);

			$(window).resize(function() {
				that.testCollapseNeeded.apply(that);
			});
		},
		testCollapseNeeded: function() {
			if($(window).width() < this.minWindowWidth && !this.isCollapsed) {
				this.isCollapsed = true;
				this.collapseOut();
			} else {
				this.messages.reinitialise();
			}
		},
		show: function() {
			var that = this;

			this.$el.height(0).show().animate({
				height: this.baseHeight
			}, {
				duration: this.duration,
				complete: function() {
					that.isOpened = true;
				}
			});

			this.messages.update(0, true);
			this.messages.update(this.messages.fetchInterval);

			this.users.update(0, true);
			this.users.update(this.users.fetchInterval);
		},
		hide: function() {
			var that = this;

			this.$el.animate({
				height: 0
			}, {
				duration: this.duration,
				complete: function() {
					that.$el.hide();
					that.isOpened = false;
				}
			});

			this.messages.stopUpdate();
			this.users.stopUpdate();
		},
		mousewheel: function(e) {
			e.stopPropagation();
			return false;
		},
		collapsed: function() {
			this.messages.jsp.reinitialise();
			//this.$el.find('.jspDrag').show();
		},
		collapseIn: function() {
			this.$el.removeClass('chat_collapsed');
			this.collapse(true);
		},
		collapseOut: function() {
			this.$el.addClass('chat_collapsed');
			this.collapse(false);
		},
		collapse: function(inside) {
			var that = this;
			var $inner = this.$el.find('.chat__messages__inner');
			var w1 = this.$el.find('.chat__messages__inner').width(),
				w2 = this.$el.find('.jspPane').width(),
				diff = this.collapseExtraWidth * (inside ? -1 : 1);

			$inner.animate({
				width: parseInt(w1) + diff
			}, {
				duration: this.collapseDuration
			});
			$inner.find('.jspContainer').animate({
				width: parseInt(w1) + diff
			}, {
				duration: this.collapseDuration
			});
			$inner.find('.jspPane').animate({
				width: parseInt(w2) + diff
			}, {
				duration: this.collapseDuration
			});
		},
		collapseClick: function() {
			var that = this;

			this.trigger('collapse');

			if(this.isCollapsed) {
				this.trigger('collapseIn');
			} else {
				this.trigger('collapseOut');
			}

			this.isCollapsed = !this.isCollapsed;

			setTimeout(function() {
				that.trigger('collapsed');
			}, this.collapseDuration + this.collapseExtraWait);
		},
		update: function(e) {
			var that = this;
			var $current = $(e.currentTarget);
			var startTime = timestamp();
			var check = function() {
				var currentTime = timestamp();
				var diff = Math.max(0, that.updateCircleTime - (currentTime-startTime));

				setTimeout(function() {
					$current.removeClass('loader');
				}, diff);
			}

			$current.addClass('loader');
			this.messages.update();
			this.users.update();

			this.users.once('sync', check);
			this.users.once('error', check);
		}
	});

	return ChatView;
});