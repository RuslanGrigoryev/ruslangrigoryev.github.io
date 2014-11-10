define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ModalImage = require('block!modal/_image'),
		PhotoModel = require('models/photo/photo');

	var PhotoController = Backbone.Marionette.Controller.extend({
		displayPhoto: function(id) {
			var model = new PhotoModel({
				id: id
			});
			var view = new ModalImage({
				model: model
			});
		}
	});

	var PhotoRouter = Backbone.Marionette.AppRouter.extend({
		controller: PhotoController,
		appRoutes: {
			"photo/:id": "displayPhoto"
		}
	});

	return function() {
		if(_.isUndefined(App.PhotoRouter)) {
			App.PhotoRouter = new PhotoRouter({controller: new PhotoController()});
		}

		return App.PhotoRouter;
	};
});