define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ModalReputation = require('block!modal/_reputation'),
		ModalReputationListView = require('block!modal/_reputation/_view/__list');

	var ModalReputationView = ModalReputation.extend({
		title: 'История репутации',
		addClass: 'modal_reputation_view',
		ui: {
			content: '.modal__content'
		},
		onRender: function() {
			this.listView = new ModalReputationListView(_.extend(this.options, {
				el: this.ui.content,
				model: new Backbone.Model(this.options)
			}));
			this.listView.render();
		}
	});

	return ModalReputationView;
});