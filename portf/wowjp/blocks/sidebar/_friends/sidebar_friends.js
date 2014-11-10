define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		SidebarFriendsTemplate = require('textblock!sidebar/_friends.html'),
		SidebarFriendsItemView = require('block!sidebar/_friends/__item'),
		UsersCollection = require('collections/users');

	var SidebarFriendsView = Backbone.Marionette.CompositeView.extend({
		childView: SidebarFriendsItemView,
		childViewContainer: '.list_category',
		allCollection: new UsersCollection(),
		collection: new UsersCollection(),
		template: _.template(SidebarFriendsTemplate),
		childLimit: 10,
		ui: {
			list: '.list_category',
			input: '.search__input'
		},
		events: {
			'keyup .search__input': 'search',
			'click .search__submit': 'search'
		},
		initialize: function() {
			var that = this;
			this.allCollection.fetch({
				data: {
					action: 'friends'
				},
				success: function() {
					that.collection = that.getFilterCollection();
					that.render();
					that.ui.list.removeClass('loader');
				}
			});

			this.render();
		},
		getFilterCollection: function(name) {
			if(_.isUndefined(name)) {
				name = '';
			}

			var that = this;
			var nameEsc = name.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
				cnt = 0;
			var sq = new RegExp(nameEsc, 'gi');
			var filtered = this.allCollection.filter(function(user) {
				var acpt = sq.test(user.get("nickname"));

				if(acpt && cnt < that.childLimit) {
					cnt++;
					return true;
				} else {
					return false;
				}
			});
			return new UsersCollection(filtered);
		},
		search: function() {
			var query = this.ui.input.val();
			this.collection = this.getFilterCollection(query);
			this.render();
			this.ui.list.removeClass('loader');
			this.ui.input.val(query)
				.focus();
		}
	});

	return SidebarFriendsView;
});