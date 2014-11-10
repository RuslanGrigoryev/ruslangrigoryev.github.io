define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		templateDate = require('helpers/templateDate'),
		ModalReputationListItemTemplate = require('textblock!modal/_reputation/_view/__list/__item.html');

	var ModalReputationListItemView = Backbone.Marionette.ItemView.extend({
		template: _.template(ModalReputationListItemTemplate),
		tagName: 'li',
		events: {
			'click a[data-type=delete]': 'delete'
		},
		className: 'modal_reputation_view__list__item',
		templateHelpers: {
			templateDate: templateDate
		},
		delete: function() {
			this.model.setSyncAttributes(['id']);
			this.model.destroy();
			this.model.clearSyncAttributes();
		}
	});

	return ModalReputationListItemView;
});