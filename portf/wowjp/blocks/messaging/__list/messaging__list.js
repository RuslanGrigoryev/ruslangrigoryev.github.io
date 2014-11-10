define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		MessagingListItemView = require('block!messaging/__list/__item'),
		SmilesView = require('block!smiles'),
		timestamp = require('helpers/timestamp'),
		UserModel = require('models/user'),
		PrivateMessagesCollection = require('collections/privateMessages');

	var MessagingView = Backbone.Marionette.CollectionView.extend({
		childView: MessagingListItemView,
		childViewContainer: '.messaging__list',
		collection: new PrivateMessagesCollection(),
		animationDuration: 200,
		fetchInterval: 5000,
		isFetched: false,
		initialize: function(options) {
			var that = this;

			if (_.isUndefined(options)) {
				options = {};
			}

			this.options = options;

			this.smiles = new SmilesView();
			this.secondUser = new UserModel({
				id: this.options.sender_id
			});
			this.childViewOptions = {
				parent: this
			};

			this.collection.on('add', this.onCollectionChange, this);
			this.collection.on('remove', this.onCollectionChange, this);

			this.secondUser.fetch({
				data: {
					id: this.secondUser.get('id')
				},
				success: function() {
					that.update(0, true);
					that.update(that.fetchInterval);
				}
			});
		},
		onCollectionChange: function() {
			var that = this;

			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = setTimeout(function() {
				if (_.isUndefined(that.jsp)) {
					that.jsp = that.$el.jScrollPane().data('jsp');

					setTimeout(function() {
						that.$el.bind('jsp-scroll-y', function() {
							that.onScroll.apply(that, arguments);
						});
					}, that.animationDuration * 2);
				} else {
					var $last = that.$el.find('.jspPane .messaging__list__item').last();

					if ($last.length > 0) {
						that.$el.find('.messaging__list__item').last()
							.detach().insertAfter($last);
					}

					that.jsp.destroy();
					that.el = that.$el = $('.messaging__list');
					that.jsp = that.$el.jScrollPane().data('jsp');

					// that.jsp.reinitialise();
				}

				that.trigger('initialized');

			}, _.isUndefined(that.jsp) ? 20 : 0);
		},
		onRender: function() {
			var that = this;

			this.smiles.setProperty('parentEl', this.$el.find('.chat__messages__create'));
			this.smiles.setProperty('inputEl', this.$el.find('.chat__messages__create__input input'));
		},
		onScroll: function() {
			var that = this;
			var scrollTop = this.jsp.getContentPositionY();

			console.log('scroll', scrollTop);

			if (0 == scrollTop) {
				var min = Number.MAX_VALUE;
				this.collection.each(function(model) {
					if (min > model.get('onCreated')) {
						min = model.get('onCreated');
					}
				});

				this.$el.addClass('loader');
				this.fetchNewMessagesDirectParams({
					data: {
						init: true,
						fetched: min,
						sender_id: this.options.sender_id,
						receiver_id: App.currentUser.get('id')
					},
					error: function() {
						this.$el.removeClass('loader');
					},
					success: function() {
						this.$el.removeClass('loader');
					}
				});
			}

			if (false) {
				
			}
		},
		update: function(pause, isInit) {
			if (_.isUndefined(pause)) {
				pause = 0;
			}

			var that = this;

			if (pause < 1) {
				this.fetchNewMessagesDirect(isInit);
			} else {
				clearTimeout(this.fetchNewMessagesTimeout);
				this.fetchNewMessagesTimeout = setTimeout(function() {
					that.fetchNewMessagesDirect.apply(that, arguments);
					that.update.call(that, pause, isInit);
				}, pause);
			}
		},
		fetchNewMessagesDirect: function(isInit) {
			if (_.isUndefined(isInit)) {
				isInit = false;
			}

			var that = this;
			var newTimestamp = timestamp();

			if (isInit) {
				this.lastFetchTime = timestamp();
			}

			this.fetchNewMessagesDirectParams({
				data: {
					init: isInit,
					fetched: this.lastFetchTime,
					sender_id: this.options.sender_id,
					receiver_id: App.currentUser.get('id')
				},
				error: function() {
					that.lastFetchTime = newTimestamp;
				},
				success: function() {
					that.lastFetchTime = newTimestamp;
					that.isFetched = true;
					
					that.once('initialized', function() {
						that.jsp.scrollToPercentY(100, that.animationDuration);
					});
				}
			});
		},
		fetchNewMessagesDirectParams: function(options) {
			if (_.isUndefined(options)) {
				options = {};
			}

			if (_.isUndefined(options.data)) {
				options.data = {};
			}

			var that = this;

			new PrivateMessagesCollection().fetch({
				data: options.data,
				error: function() {
					if (_.isFunction(options.error)) {
						options.error.apply(that, arguments);
					}
				},
				success: function(collection, resp) {
					that.$el.removeClass('loader');
					that.collection.add(collection.models);

					if (_.isFunction(options.success)) {
						options.success.apply(that, arguments);
					}
				}
			});
		},
		stopUpdate: function() {
			clearTimeout(this.fetchNewMessagesTimeout);
		}
	});

	return MessagingView;
});