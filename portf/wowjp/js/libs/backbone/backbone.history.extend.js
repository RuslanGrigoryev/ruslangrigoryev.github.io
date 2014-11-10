define(['underscore', 'backbone'], function(_, Backbone) {
	Backbone.history.list = [location.hash.substr(1)];
	Backbone.history.events = {};
	Backbone.history.current = 0;
	Backbone.history.preventChange = false;
	Backbone.history.isCanBack = function() {
		return !(Backbone.history.current <= 0) || (typeof Backbone.history._onceBack !== "undefined");
	};
	Backbone.history.isCanForward = function() {
		return !(Backbone.history.current >= Backbone.history.list.length - 1);
	};
	Backbone.history.navigateCurrent = function() {
		location.hash = Backbone.history.list[Backbone.history.current];
	};
	Backbone.history.removeLast = function() {
		Backbone.history.list.splice(Backbone.history.list.length - 1, 1);
		if (Backbone.history.list.length > 0) {
			location.hash = Backbone.history.list[Backbone.history.list.length - 1];
			console.log('hash', Backbone.history.list[Backbone.history.list.length - 1]);
		}
	};
	Backbone.history.onceBack = function() {
		if (typeof Backbone.history._onceBack !== "undefined") {
			// if(Backbone.history.list.length > 0)
			// 	Backbone.history.list.splice(Backbone.history.list.length-1, 1);
			Backbone.history._onceBack();
			Backbone.history.removeOnceBack();

			if (Backbone.history.list[Backbone.history.list.length - 1] !== location.hash) {
				Backbone.history.list.push(location.hash);
			}
			return true;
		}
		return false;
	};
	Backbone.history.back = function() {
		if (!Backbone.history.isCanBack()) return;
		if (Backbone.history.onceBack()) return;
		Backbone.history.current--;
		Backbone.history.preventChange = true;
		Backbone.history.navigateCurrent();
	};
	Backbone.history.forward = function() {
		if (!Backbone.history.isCanForward()) return;
		Backbone.history.current++;
		Backbone.history.preventChange = true;
		Backbone.history.navigateCurrent();
	};
	Backbone.history.bind = function(event, f, name) {
		if (typeof Backbone.history.events[event] === "undefined")
			Backbone.history.events[event] = [];

		if (typeof name === "undefined")
			Backbone.history.events[event].push(f);
		else
			Backbone.history.events[event]["name"] = f;
	};
	Backbone.history.unBind = function(event, name) {
		if (typeof Backbone.history.events[event] === "undefined") return;

		delete Backbone.history.events[event]["name"];
	};

	Backbone.history.changed = function(route, router) {
		if (typeof Backbone.history._onceBack !== "undefined") return;
		var evs = Backbone.history.events["changed"];
		for (var name in evs) {
			evs[name](route, router);
		}
	};
	Backbone.history.addOnceBack = function(f) {
		Backbone.history._onceBack = f;
		//Backbone.history.list.push("#");
	};
	Backbone.history.removeOnceBack = function() {
		delete Backbone.history._onceBack;
		//Backbone.history.list.push("#");
	};



	//Adding chaned event
	Backbone.history.bind("changed", function(route, router) {
		if (route == "route") return;
		if (Backbone.history.preventChange) {
			Backbone.history.preventChange = false;
			return;
		}

		//branching and removing face part
		Backbone.history.list.splice(Backbone.history.current + 1, Backbone.history.list.length - Backbone.history.current);

		var h = location.hash.substr(1);
		if (h != Backbone.history.list[Backbone.history.list.length - 1]) {
			Backbone.history.list.push(h);
		}
		Backbone.history.current = Backbone.history.list.length - 1;
	});
});