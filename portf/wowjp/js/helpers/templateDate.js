define(function(require) {
	var dateDifference = require('helpers/dateDifference');

	return function(t1) {
		var difference = dateDifference(t1),
			timestamp = new Date(t1 * 1000),
			now = new Date();

		var today = Date(now.getFullYear(), now.getMonth(), now.getDate()),
			yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

		if (0 == difference.days && 0 == difference.hours) {
			if(1 >= difference.minutes) {
				return 'только что';	
			}

			if(2 >= difference.minutes) {
				return '1 минуту назад';	
			}

			if(5 >= difference.minutes) {
				return (difference.minutes-1)+' минуты назад';
			}

			return (difference.minutes-1)+' минут назад';
		}

		if (0 == difference.days) {
			if(2 >= difference.hours) {
				return '1 час назад';	
			}

			if(5 >= difference.hours) {
				return (difference.hours-1)+' часа назад';
			}

			return (difference.hours-1)+' часов назад';
		}

		if (timestamp >= today) {
			return 'сегодня';
		}

		if (timestamp >= yesterday && timestamp < today) {
			return 'вчера';
		}

		if (difference.days >= 30) {
			return ('0' + timestamp.getDate()).slice(-2) + '.' + 
				('0' + (timestamp.getMonth() + 1)).slice(-2) + '.' + 
				timestamp.getFullYear();
		}

		switch (difference.days) {
			case 1:
				return difference.days + ' день назад';
			case 2:
			case 3:
			case 4:
				return difference.days + ' дня назад';
			default:
				return difference.days + ' дней назад';
		}


	}
});