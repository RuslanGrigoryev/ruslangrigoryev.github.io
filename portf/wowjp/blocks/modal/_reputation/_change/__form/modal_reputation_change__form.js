define(function(require) {
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require('marionette'),
		ModalReputationChangeFormTemplate = require('textblock!modal/_reputation/_change/__form.html'),
		ReputationModel = require('models/reputation'),
		Notice = require('block!notice');
		require('formstyler');

	var ModalReputationListView = Backbone.Marionette.ItemView.extend({
		template: _.template(ModalReputationChangeFormTemplate),
		multiplier: 1,
		ui: {
			radioButtons: 'input[type=radio]',
			plusButton: 'input[type=radio][value=1]',
			minusButton: 'input[type=radio][value=-1]',
			neutralButton: 'input[type=radio][value=0]',
			comment: 'textarea'
		},
		events: {
			'change input[type=radio]': 'clickRadio',
			'click button[type=cancel]': 'cancel',
			'click button[type=confirm]': 'submit'
		},
		initialize: function(options) {
			if(_.isUndefined(options)) {
				options = {};
			}

			this.options = options;
		},
		onRender: function() {
			this.$el.find('input, textarea, select').styler();

			switch(this.options.type) {
				case 'minus': this.changeType(this.ui.minusButton); break;
				case 'neutral': this.changeType(this.ui.neutralButton); break;
				
				default:
				case 'plus': this.changeType(this.ui.plusButton); break;
			}
		},
		clickRadio: function(e) {
			var $this = $(e.currentTarget);
			this.multiplier = $this.val()*1;
			this.changeType($this);
		},
		changeType: function($button) {
			this.ui.radioButtons.prop('checked', false);
			this.$el.find('.jq-radio.checked').removeClass('checked');
			setTimeout(function() {
				$button
					.prop('checked', true)
					.parents('.jq-radio')
					.addClass('checked');
			});
		},
		cancel: function() {
			this.options.parent.close();
		},
		submit: function() {
			var that = this;
			var model = new ReputationModel({
				multiplier: this.multiplier,
				comment: this.ui.comment.val(),
				receiver_id: this.options.user_id,
				refererUrl: window.location.pathname
			});

			this.ui.comment.attr('readonly','readonly');
			model.setSyncAttributes(['multiplier', 'comment', 'receiver_id', 'refererUrl']);
			model.save(null, {
				success: function() {
					Notice({
						layout: 'bottomRight',
						text: 'Сохранено'
					});
					that.ui.comment.removeAttr('readonly');
					that.ui.comment.val('');
					that.options.parent.close();
				},
				error: function() {
					Notice({
						layout: 'bottomRight',
						text: 'Ошибка сохранения'
					});
					that.ui.comment.removeAttr('readonly');
					that.ui.comment.val('');
				}
			})
			model.clearSyncAttributes();
		}
	});

	return ModalReputationListView;
});