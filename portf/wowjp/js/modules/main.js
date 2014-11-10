define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		Journal = require('block!journal');

	return function(Main, App) {
		this.addInitializer(function(){
			var journal = new Journal({
				el: App.ContentRegion.el
			});
			App.ContentRegion.currentView = journal;

			if(!journal.render()) {
				var journalLoadInterval = setInterval(function() {
					if(journal.render()) {
						clearInterval(journalLoadInterval);
					}
				}, 100);
			}
		});
	};

});