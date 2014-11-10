define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ModalReputationListTemplate = require('textblock!modal/_reputation/_view/__list.html'),
		ModalReputationListItemView = require('block!modal/_reputation/_view/__list/__item'),
		ReputationCollection = require('collections/reputation'),
		ModalReputationChangeView = require('block!modal/_reputation/_change');
		require('jscrollpane');

	var ModalReputationListView = Backbone.Marionette.CompositeView.extend({
		template: _.template(ModalReputationListTemplate),
		childView: ModalReputationListItemView,
		childViewContainer: '.modal_reputation_view__list',
		ui: {
			list: '.modal_reputation_view__list',
			state: '.modal_reputation_view__list__state'
		},
		events: {
			'click .button_pen': 'changeReputation'
		},
		deltaWidth: 20,
		pageId: 0,
		stopLoading: false,
		collection: new ReputationCollection(),
		childViewOptions: {},
		animationDuration: 300,
		initialize: function(options) {
			if(_.isUndefined(options)) {
				options = {};
			}

			this.options = options;

			this.collection.on('add', this.onCollectionChange, this);
			//this.collection.on('remove', this.onCollectionChange, this);
		},
		onRender: function() {
			this.fetchMore();
		},
		onCollectionChange: function() {
			var that = this;

			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = setTimeout(function() {
				if (_.isUndefined(that.jsp)) {
					that.jsp = that.ui.list.jScrollPane().data('jsp');

					setTimeout(function() {
						that.$el.bind('jsp-scroll-y', function() {
							that.onScroll.apply(that, arguments);
						});
					}, that.animationDuration * 2);
				} else {
					var $last = that.$el.find('.jspPane .modal_reputation_view__list__item').last();

					if ($last.length > 0) {
						that.$el.find('.modal_reputation_view__list__item').last()
							.detach().insertAfter($last);
					}
					
					that.jsp.reinitialise();
				}

				that.ui.list.find('.jspPane').css({
					width: that.ui.list.find('.jspContainer').width()
				});

				that.trigger('initialized');

			}, _.isUndefined(that.jsp) ? 20 : 0);
		},
		onScroll: function() {
			var that = this;

			if (!this.stopLoading && 1 == this.jsp.getPercentScrolledY()) {
				this.fetchMore();
			}
		},
		fetchMore: function() {
			var that = this;

			this.ui.list.addClass('loader');

			new ReputationCollection().fetch({
				data: {
					user_id: this.options.user_id,
					page_id: this.pageId++
				},
				success: function(collection, models, responce) {
					if(models.length < 1) {
						that.stopLoading = true;

						if(1 == that.pageId) {
							that.ui.state.show();
						}
					} else {
						that.collection.add(models);
					}

					that.ui.list.removeClass('loader');
				},
				error: function() {
					that.ui.list.removeClass('loader');
				}
			});
		},
		changeReputation: function() {
			var modal = new ModalReputationChangeView(_.extend(this.options, {
				el: '.overlay'
			}));
			modal.updateModal();
		}
	});

	return ModalReputationListView;
});