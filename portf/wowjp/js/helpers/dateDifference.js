define(function(require) {
	return function(t1, t2) {
		if("undefined" == typeof t2) {
			t2 = new Date().getTime()/1000;
		}

		t1 = new Date(t1 * 1000);
		t2 = new Date(t2 * 1000);
		var diffMs = (t2 - t1);
		var diffDays = Math.round(diffMs / 86400000); // days
		var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
		var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

		return {
			days: diffDays,
			hours: diffHrs,
			minutes: diffMins,
			miliseconds: diffMs
		}

	}
});