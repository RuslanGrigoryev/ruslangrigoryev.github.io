define(function(require) {
	if (!(window.pluso && typeof window.pluso.start == "function") && window.ifpluso == undefined) {
		require('libs/pluso/pluso-like');
	}
});