define(function(require) {
	return function(timestamp) {
		var date = new Date(timestamp*1000);
		var hours = date.getHours(),
			mins = date.getMinutes(),
			secs = date.getSeconds();

		hours = hours > 10 ? hours : "0"+hours;
		mins = mins > 10 ? mins : "0"+mins;
		secs = secs > 10 ? secs : "0"+secs;

		return hours+':'+mins+':'+secs;
	}
});