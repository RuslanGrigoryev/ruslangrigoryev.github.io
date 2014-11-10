define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		CommentsTemplate = require('textblock!comments.html'),
		CommentsItemView = require('block!comments/__item'),
		CommentsCollection = require('collections/comments'),
		CommentsAnswerView = require('block!comments/__field/_answer'),
		SmilesView = require('block!smiles');

	var CommentsView = Backbone.Marionette.CompositeView.extend({
		isLoaded: false,
		template: _.template(CommentsTemplate),
		childView: CommentsItemView,
		childViewContainer: '.comments__list',
		collection: new CommentsCollection(),
		childViewOptions: {},
		ui: {
			answer: '.comments__field_answer:eq(0)',
			commentsMore: '.comments__more',
			commentsNumber: '.comments__header__item',
			commentsMoreNumber: '.comments__more__number',
			list: '.comments__list'
		},
		initialize: function() {
			var that = this;
			this.module_id = this.$el.data('moduleid');
			this.entry_id = this.$el.data('entryid');
			this.smiles = new SmilesView();
			this.childViewOptions.comments = this;

			$(window).add($('.modal_wrapper')).on('scroll resize', function() {
				that.updateVisible.apply(that, arguments);	
			});
			this.updateVisible();
		},
		updateVisible: function() {
			if(this.isLoaded || this.$el.offset().top > $(window).scrollTop() + $(window).height()) {
				return;
			}

			this.fetch();
		},
		fetch: function() {
			var that = this;
			this.collection.fetch({
				data: $.param({
					module_id: this.module_id,
					entry_id: this.entry_id
				}),
				success: function() {
					that.render();
				},
				error: function() {
					that.render();
				}
			});

			this.isLoaded = true;
		},
		onRender: function() {
			this.answerView = new CommentsAnswerView({
				el: this.ui.answer,
				model: App.currentUser,
				comments: this
			});
			this.answerView.render();

			this.ui.list.removeClass('loader');

			// if(this.collection.defaultCount < this.collection.length) {
			// 	this.ui.commentsMore.css('display', 'block');
			// 	this.ui.commentsMoreNumber.html(this.collection.length);
			// }

			if(this.collection.length > 0) {
				this.ui.commentsNumber.html(this.collection.length);
			}
		},
		onAddChild: function(childView) {
			if(childView.model.isNew) {
				childView.$el.detach();
				this.ui.list.prepend(childView.$el);
			}

			var parentId = childView.model.get('parent_id');

			if(!_.isNull(parentId)) {
				var $parent = this.$el.find('.comments__item[data-id='+parentId+'] > .comments__list__inner');
				childView.$el.detach();
				$parent.append(childView.$el);
			}
		}
	});

	return CommentsView;
});