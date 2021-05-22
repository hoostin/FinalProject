// if obj has right keys
// check each key is right format
// people/number res_date/date res_time/time // think about mobile/names
// date isPast/isTuesday
//time isTimeOpen/isTimeValid
// no values null

// added = formData

function theValidator(formData, setError) {
	setError(null);
	let message = "";
	if (!isTimeOpen(formData.reservation_time)) {
		message += "  /Closed only open 10:30 AM - 10:30 PM with 1hr window ";
	}
	if (isTuesday(formData.reservation_date)) {
		message += "  /Closed Tuesdays";
	}
	if (isPast(formData.reservation_date)) {
		message += " /Must be in Future";
	}
	if (!isTimeValid(formData.reservation_time, formData.reservation_date)) {
		message += "/ Must be in Future ";
	}
	if (message.length) {
		setError(new Error(message));
		return false;
	} else {
		return true;
	}
}
