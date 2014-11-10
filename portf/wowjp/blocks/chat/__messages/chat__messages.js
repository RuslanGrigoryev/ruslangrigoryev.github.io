define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ChatMessageModel = require('models/chatMessage'),
		ChatMessagesTemplate = require('textblock!chat/__messages.html'),
		ChatMessagesItemView = require('block!chat/__messages/__item'),
		ChatMessagesCollection = require('collections/chatMessages'),
		SmilesView = require('block!smiles'),
		timestamp = require('helpers/timestamp'),
		Keys = require('helpers/keys'),
		Notice = require('block!notice');
		require('jscrollpane');

	var ChatMessagesView = Backbone.Marionette.CompositeView.extend({
		template: _.template(ChatMessagesTemplate),
		childView: ChatMessagesItemView,
		childViewContainer: '.chat__messages__inner',
		collection: new ChatMessagesCollection(),
		// childViewOptions: {
		// 	parent: this
		// },
		animationDuration: 200,
		fetchInterval: 5000,
		isFetched: false,
		ui: {
			items: '.chat__messages__item',
			inner: '.chat__messages__inner',
			submit: '.button_submit',
			input: '.chat__messages__create__input input'
		},
		events: {
			'click .button_submit': 'submit',
			'click .button_smile': 'toggleSmiles',
			'keyup': 'keyup'
		},
		initialize: function() {
			var that = this;
			this.smiles = new SmilesView();
			this.childViewOptions = {
				parent: this
			};

			this.collection.on('add', this.onCollectionChange, this);
			this.collection.on('remove', this.onCollectionChange, this);
		},
		onCollectionChange: function() {
			var that = this;

			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = setTimeout(function() {
				if(_.isUndefined(that.jsp)) {
					that.jsp = that.ui.inner.jScrollPane().data('jsp');
				} else {
					that.ui.inner.find('.chat__messages__item').last()
						.detach().insertAfter(that.$el.find('.jspPane .chat__messages__item').last());
					that.jsp.reinitialise();
				}

				that.jsp.scrollToPercentY(100, that.animationDuration);

			}, _.isUndefined(that.jsp) ? 20 : 0);
		},
		reinitialise: function() {
			this.jsp.reinitialise();
			this.jsp.scrollToPercentY(100, this.animationDuration);
		},
		onRender: function() {
			var that = this;

			this.smiles.setProperty('parentEl', this.$el.find('.chat__messages__create'));
			this.smiles.setProperty('inputEl', this.$el.find('.chat__messages__create__input input'));

			$('body').click(function() {
				that.outsideClick.apply(that);
			})
		},
		update: function(pause, isInit) {
			if(_.isUndefined(pause)) {
				pause = 0;
			}

			var that = this;

			if(pause < 1) {
				this.fetchNewMessagesDirect(isInit);
			} else {
				clearTimeout(this.fetchNewMessagesTimeout);
				this.fetchNewMessagesTimeout = setTimeout(function() {
					that.fetchNewMessagesDirect.apply(that, arguments);
				}, pause);
			}
		},
		fetchNewMessagesDirect: function(isInit) {
			if(_.isUndefined(isInit)) {
				isInit = false;
			}

			var that = this;
			var newTimestamp = timestamp();

			if(isInit) {
				this.lastFetchTime = timestamp();
			}

			var newMessages = new ChatMessagesCollection().fetch({
				data: {
					init: isInit,
					fetched: this.lastFetchTime
				},
				error: function() {
					that.lastFetchTime = newTimestamp;
				},
				success: function(collection, resp) {
					that.ui.inner.removeClass('loader');
					that.lastFetchTime = newTimestamp;
					that.collection.add(collection.models);

					that.isFetched = true;
				}
			});
		},
		submit: function() {
			var that = this;
			var chatMessage = new ChatMessageModel({
				message: this.ui.input.val(),
				sender_id: window.App.currentUser.get('id'),
				senderNickname: window.App.currentUser.get('nickname'),
				onCreated: new Date().getTime()/1000
			});
			chatMessage.setSyncAttributes(['id', 'message']);
			chatMessage.on('invalid', this.onError, this);
			chatMessage.save(null, {
				error: function() {
					that.onError.call(that, chatMessage, 'Ошибка сохранения')
				},
				success: function() {
					that.update.apply(that);
				}
			});
			chatMessage.clearSyncAttributes();
			this.ui.input.val('').focus();

			this.ui.inner.addClass('loader');

			//this.collection.add(chatMessage);
		},
		keyup: function(e) {
			if(e.keyCode == Keys.ENTER) {
				this.submit();
				e.stopPropagation();
				return false;
			}
		},
		onError: function(model, error) {
			Notice({
				layout: 'bottomRight',
				text: error
			});
		},
		toggleSmiles: function(e) {
			if (!this.smiles.isRendered) {
				this.smiles.render();
			}

			if (this.smiles.isOpened) {
				this.smiles.hide();
			} else {
				this.smiles.show();
			}

			e.stopPropagation();
			return false;
		},
		outsideClick: function() {
			this.smiles.hide();
		},
		stopUpdate: function() {
			clearTimeout(this.fetchNewMessagesTimeout);
		}
	});

	return ChatMessagesView;
});