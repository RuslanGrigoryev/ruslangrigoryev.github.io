require.config({
	baseUrl: 'js',
	paths: {
		'order': 'libs/require/order',
		'text': 'libs/require/text',
		'json': 'libs/require/json',
		'css': 'libs/require/css.min',
		'block': 'libs/require/block',
		'textblock': 'libs/require/textblock',

		'blocks': '../blocks',

		'jqueryplugins': 'libs/jquery/plugins/',
		'jquery': 'libs/jquery/jquery-1.10.2',

		'backbone': 'libs/backbone/backbone-min',
		'backbone.history.extend': 'libs/backbone/backbone.history.extend',
		'backbone.view.xevent': 'libs/backbone/backbone.view.xevent',
		'marionette': 'libs/marionette/backbone.marionette',
		'backbone.wreqr': 'libs/marionette/backbone.wreqr',
		'backbone.babysitter': 'libs/marionette/backbone.babysitter',
		'underscore': 'libs/backbone/underscore-min',

		'html5shiv': 'libs/html5shiv/html5shiv',
		'respond.js': 'libs/respond.js/respond.min',

		'json2': 'libs/json2/json2',

		'cookie': 'libs/jquery/plugins/cookie.jquery',
		'coodrinates': 'libs/jquery/plugins/coordinates.jquery',

		'jquery-ui': 'libs/jquery/jquery-ui/js/jquery-ui-1.10.4.custom.min',
		'dropzone': 'libs/dropzone/dropzone-amd-module',
		'noty': 'libs/jquery/plugins/noty/',
		'emessage': 'libs/jquery/plugins/emessage.jquery',
		'velocity': 'libs/jquery/plugins/velocity/jquery.velocity.min',
		'nprogress': 'libs/nprogress/nprogress',

		'isotope.stick': 'libs/isotope/isotope.stick.ext',
		'isotope': 'libs/isotope/isotope.pkgd.min',

		'jscrollpane': 'libs/jscrollpane/jquery.jscrollpane.min',
		'mousewheel': 'libs/jscrollpane/jquery.mousewheel',
		'formstyler': 'libs/formstyler/jquery.formstyler.min',
		'pluso': 'libs/pluso/pluso',

		'config': 'generated/config.json',
		'smilesList': 'generated/smiles.json'

		// 'config': '../../../ajax/config',
		// 'smilesList': '../../../ajax/smile/list'
	},
	map: {
		'*': {
			'css': 'libs/require/css.min'
		}
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		'cookie': {
			deps: ["jquery"]
		},
		'coodrinates': {
			deps: ["jquery"]
		},
		'jquery-ui': {
			deps: ["jquery"]
		},
		'emessage': {
			deps: ["jquery"]
		},
		// 'nprogress': {
		// 	deps: ['css!libs/nprogress/nprogress']
		// },
		'libs/isotope/isotope.stick.ext': {
			deps: ['jquery', 'libs/isotope/isotope.pkgd.min']
		},
		'noty': {
			deps: ['jquery']
		},
		'jscrollpane': {
			deps: ['jquery', 'mousewheel']
		},
		'mousewheel': {
			deps: ['jquery']
		},
		'formstyler': {
			deps: ['jquery']	
		}
	}
});

require(['underscore', 'backbone', 'marionette', 'json!config', 'modules/global', 'modules/main', 'modules/messaging', 'modules/profile', 'models/user', 'cookie', 'pluso'],
	function(_, Backbone, Marionette, Config, GlobalModule, MainModule, MessagingModule, ProfileModule, UserModel) {
		var app = new Backbone.Marionette.Application();
		window.App = app;

		app.addRegions({
			HeaderRegion: '#header',
			SlideshowRegion: '#slideshow',
			ContentRegion: '#content',
			FooterRegion: '#footer',
			CommentsRegion: '.comments',
			SidebarsRegion: '.sidebar',
			SectionRegion: '.section',
			MessagingRegion: '.messaging'
		});

		app.config = Config;

		app.module('GlobalModule', {
			startWithParent: true,
			define: GlobalModule
		});

		app.module('MainModule', {
			startWithParent: false,
			define: MainModule
		});

		app.module('MessagingModule', {
			startWithParent: false,
			define: MessagingModule
		});

		app.module('ProfileModule', {
			startWithParent: false,
			define: ProfileModule
		});

		app.vent.on("routing:started", function() {
			Backbone.history.start();
		});

		app.addInitializer(function() { 
			return app.vent.trigger("routing:started");
		});

		$.cookie('currentUserData', JSON.stringify({
			id: 1,
			nickname: 'Popov',
			onLastReputationCreated: 1412765037,
			group: {
				isCanDeleteOwnChatMessages: true
			}
		}));

		var userData = $.cookie('currentUserData');
		var currentUser = new UserModel(_.isUndefined(userData) ? {} : JSON.parse(userData));
		app.currentUser = currentUser;

		app.navigate = function(url, params) {
			if(_.isUndefined(params)) {
				params = {trigger:true};
			}

			Backbone.history.navigate(url, params);
		}

		app.start();
		// var evt = document.createEvent("Event");
		// evt.initEvent("regirested", true, true);
		// document.dispatchEvent(evt);
	});