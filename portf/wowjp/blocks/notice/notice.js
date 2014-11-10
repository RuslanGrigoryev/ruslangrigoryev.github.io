define(function(require) {
	require('noty/packaged/jquery.noty.packaged.min');
	//require('order!noty/jquery.noty');
	// require('noty/layouts/bottom');
	// require('noty/layouts/bottomCenter');
	// require('noty/layouts/bottomLeft');
	//require('order!noty/layouts/bottomRight');
	// require('noty/layouts/center');
	// require('noty/layouts/centerLeft');
	// require('noty/layouts/centerRight');
	// require('noty/layouts/inline');
	// require('noty/layouts/top');
	// require('noty/layouts/topCenter');
	// require('noty/layouts/topLeft');
	// require('order!noty/layouts/topRight');

	$.noty.defaults.closeWith = ['click', 'button'];
	$.noty.defaults.layout = 'topRight';
	$.noty.defaults.timeout = 5000;

	return noty;
});