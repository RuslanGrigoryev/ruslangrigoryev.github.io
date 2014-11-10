define(['underscore', 'backbone'], function(_, Backbone) {

	var refunctionize = function(scope, f) {
			return function() {
				f.apply(scope, arguments);
			};
		};

	Backbone.View = Backbone.View.extend({
		startListenXEvents: function() {
			var first, second, last=-1;
			for(var item in this.xEvents) {
				last = item.lastIndexOf(' ');
				if(last<0) {
					this.$el.on(item, refunctionize(this,this[this.xEvents[item]]));
				} else {
					first = item.substring(0, last);
					second = item.substring(last, item.length);
					this.$el.on(first, second, refunctionize(this,this[this.xEvents[item]]));
				}
			}
		},
		stopListenXEvents: function() {
			this.$el.off();
		},
		updateXEvents: function() {
			this.stopListenXEvents();
			this.startListenXEvents();
		}
	});
});