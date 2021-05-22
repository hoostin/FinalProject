// if obj has right keys
// check each key is right format
// people/number res_date/date res_time/time // think about mobile/names
// date isPast/isTuesday
//time isTimeOpen/isTimeValid
// no values null

// added = formData
function compareKeys(a, b) {
	const aKeys = Object.keys(a).sort();
	const bKeys = Object.keys(b).sort();
	return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}
function notNull(obj) {
	for (let key in obj) {
		if (!obj[key]) return false;
	}
	return true;
}

function theValidator(formData, setError) {
	setError(null);
	const test = {
		first_name: null,
		last_name: null,
		mobile_number: null,
		reservation_date: null,
		reservation_time: null,
		people: 0,
	};
	let message = "";

	if (!compareKeys(formData, test) || !notNull(formData)) {
		message =
			"Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}";
		setError(message);
		return false;
	}

	if (/\d{4}-\d{2}-\d{2}/.test(formData.reservation_date)) {
		if (isTuesday(formData.reservation_date)) {
			message += "  /Closed Tuesdays";
		}
		if (isPast(formData.reservation_date)) {
			message += " /Must be in Future";
		}
	} else {
		message += "reservation_date must be a date";
	}
	if (/[0-9]{2}:[0-9]{2}/.test(formData.reservation_time)) {
		if (!isTimeOpen(formData.reservation_time)) {
			message += "  /Closed only open 10:30 AM - 10:30 PM with 1hr window ";
		}
		if (!isTimeValid(formData.reservation_time, formData.reservation_date)) {
			message += "/ Must be in Future ";
		}
	} else {
		message += "reservation_time must be a time ";
	}

	if (message.length) {
		setError(new Error(message));
		return false;
	} else {
		return true;
	}
}
