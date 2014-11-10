var watch = require('node-watch'),
	exec = require('child_process').exec;

var ignoreRebuild = false,
	ignoreLag = 100,
	ignoreTimeout = -1;

var rebuild = function(param) {
	if("undefined" === typeof param) {
		param = ''
	}

	if(ignoreRebuild) {
		return;
	} else{
		ignoreRebuild = true;
	}
	
	exec('sh build.sh '+param, function(error, stdout, stderr) {
		console.error(error);
		console.log(stdout);
		console.log(stderr);
		
		clearTimeout(ignoreTimeout);
		ignoreTimeout = setTimeout(function() {
			ignoreRebuild = false;
		}, ignoreLag);
	});
}

watch('./css', function(filename) {
	console.log(filename, 'css changed.');
	rebuild('--css');
});

watch('./js', function(filename) {
	console.log(filename, 'js changed.');
	rebuild('--js');
});