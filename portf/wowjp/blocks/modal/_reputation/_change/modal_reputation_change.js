define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ModalReputation = require('block!modal/_reputation'),
		dateDifference = require('helpers/dateDifference'),
		config = require('json!config'),
		Notice = require('block!notice'),
		ModalReputationChangeFormView = require('block!modal/_reputation/_change/__form');

	var ModalReputationChange = ModalReputation.extend({
		title: 'Изменить репутацию',
		addClass: 'modal_reputation_change',
		ui: {
			content: '.modal__content'
		},
		beforeRender: function() {
			var d = dateDifference(App.currentUser.get('onLastReputationCreated'));

			if(!App.currentUser.check('isCanCreateReputation')) {
				Notice({
					layout: 'bottomRight',
					text: 'Вы можете изменять репутацию'
				});
				
				this.stopRender = true;
			}

			if(config.reputation.changeInterval < 0*d.miliseconds) {
				Notice({
					layout: 'bottomRight',
					text: 'Вы можете изменять репутацию не чаще чем один раз в сутки'
				});
				
				this.stopRender = true;
			}
		},
		onRender: function() {
			this.listView = new ModalReputationChangeFormView(_.extend(this.options, {
				el: this.ui.content,
				model: new Backbone.Model(this.options),
				parent: this
			}));
			this.listView.render();
		}
	});

	return ModalReputationChange;
});