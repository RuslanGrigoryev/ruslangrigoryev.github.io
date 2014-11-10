define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ProfileView = require('block!profile'),
		SectionEditView = require('block!section/_edit');

	return function(Profile, App) {
		this.addInitializer(function(options){
			if(_.isUndefined(options)) {
				options = {};
			}

			var profile = new ProfileView(_.extend({
				el: App.SectionRegion.el
			}, options));
			App.ContentRegion.currentView = profile;

			profile.render();

			new SectionEditView({
				el: '.section_edit'
			});
		});
	};

});