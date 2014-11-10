define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette');

	var SectionEditView = Backbone.Marionette.View.extend({
		ui: {
			profile: '.section_edit__profile',
			privacy: '.section_edit__adjust'
		},
		events: {
			'click .section_edit__profile .section_edit__header .section_edit__header__toggler': 'toggleProfile',
			'click .section_edit__adjust .section_edit__header .section_edit__header__toggler': 'togglePrivate'
		},
		initialize: function(options) {
			if(_.isUndefined(options)) {
				options = {};
			}

			this.options = options;

			this.delegateEvents();
			this.bindUIElements();
		},
		toggleProfile: function() {
			this.ui.profile.toggleClass('section_edit_active');
		},
		togglePrivate: function() {
			this.ui.privacy.toggleClass('section_edit_active');
		},
	});

	return SectionEditView;
});