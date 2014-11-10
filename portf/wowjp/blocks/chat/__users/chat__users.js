define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ChatUsersTemplate = require('textblock!chat/__users.html'),
		ChatUsersItemView = require('block!chat/__users/__item'),
		UsersCollection = require('collections/users'),
		getNumEnding = require('helpers/getNumEnding');
		require('jscrollpane');

	var ChatUsersView = Backbone.Marionette.CompositeView.extend({
		template: _.template(ChatUsersTemplate),
		childView: ChatUsersItemView,
		childViewContainer: '.chat__users__list',
		collection: new UsersCollection(),
		childViewOptions: {},
		verticalDragHeight: 30,//px
		fetchInterval: 5*60*1000,
		minScrollModelsCount: 5,
		ui: {
			number: '.chat__users__online__number',
			list: '.chat__users__list'
		},
		events: {
			'click .button_collapse': 'collapse'
		},
		initialize: function() {
			var that = this;
			this.collection.on('add', this.onAdd, this);
			this.collection.on('sync', function() {
				that.trigger('sync');
			});
			this.collection.on('error', function() {
				that.trigger('error');
			});
		},
		onAdd: function() {
			var that = this;

			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = setTimeout(function() {

				if(that.minScrollModelsCount <= that.collection.length) {
					that.initializeScroll.apply(that, arguments);
				}
			}, 20);
		},
		initializeScroll: function() {
			this.jsp = this.ui.list.jScrollPane({
				// verticalDragMinHeight: this.verticalDragHeight,
				// verticalDragMaxHeight: this.verticalDragHeight
			}).data('jsp');
		},
		ifFetchedFirst: false,
		onRender: function() {
			// if(!this.ifFetchedFirst) {
			// 	this.fetchDirect();
			// 	this.update(this.fetchInterval);
			// 	this.ifFetchedFirst = true;
			// }
		},
		update: function(pause) {
			if(_.isUndefined(pause)) {
				pause = 0;
			}

			var that = this;

			if(pause < 1) {
				this.fetchDirect();
			} else {
				clearTimeout(this.updateTimeout);
				this.updateTimeout = setTimeout(function() {
					that.update.call(that, pause);
				}, pause);
			}
		},
		fetchDirect: function() {
			var that = this;

			this.ui.list.addClass('loader');

			if(!_.isUndefined(this.jsp)) {
				this.jsp.destroy();
				//this.$el.find('.jspContainer').remove();
			}
			
			this.collection.reset();
			this.collection.fetch({
				data: {
					action: 'online'
				},
				success: function(models) {
					that.render.apply(that);
					that.ui.list.removeClass('loader');
					that.ui.number.html(models.length + ' ' + getNumEnding(models.length, ['пользователь', 'пользователя', 'пользователей']));
				},
				error: function() {
					that.ui.list.removeClass('loader');
				}
			});
		},
		stopUpdate: function() {
			clearTimeout(this.updateTimeout);
		}
	});

	return ChatUsersView;
});