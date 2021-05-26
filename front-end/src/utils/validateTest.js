//import { today } from "./date-time";
function asDateString(date) {
	return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
		.toString(10)
		.padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}
function today() {
	return asDateString(new Date());
}
function assignValidator(formData, reservation, setError) {
	setError(null);
	if (!notNull(formData)) {
		setError(new Error("Must choose a Table"));
		return false;
	}
	if (reservation.people > formData.capacity) {
		setError(
			new Error("Must choose a Table with capacity greater than party size")
		);
		return false;
	}
	return true;
}
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
function tableValidator(formData, setError) {
	setError(null);
	const test = {
		table_name: null,
		capacity: 0,
		reservation_id: null,
	};
	let message = "";
	if (!compareKeys(formData, test)) {
		message =
			"Invalid data format provided. Requires {string: table_name, number: capacity}";
		setError(new Error(message));
		return false;
	}
	if (formData.table_name.length < 2) {
		message = "Table Name must be at least 2 characters";
		setError(new Error(message));
		return false;
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

		setError(new Error(message));
		return false;
	}

	if (/\d{4}-\d{2}-\d{2}/.test(formData.reservation_date)) {
		if (isTuesday(formData.reservation_date)) {
			message += "  /closed Tuesdays";
		}
		if (isPast(formData.reservation_date)) {
			message += " /Must be in future";
		}
	} else {
		message += "reservation_date must be a date";
	}
	if (/[0-9]{2}:[0-9]{2}/.test(formData.reservation_time)) {
		if (!isTimeOpen(formData.reservation_time)) {
			message += "  /closed only open 10:30 AM - 10:30 PM with 1hr window ";
		}
		if (!isTimeValid(formData.reservation_time, formData.reservation_date)) {
			message += "/ Must be in future ";
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

function mobileValidate(phoneNumber, currentLength) {
	if (phoneNumber[phoneNumber.length - 1] === "-") {
		phoneNumber = phoneNumber.slice(0, phoneNumber.length - 1);
	}
	if (phoneNumber.length === 3) {
		if (currentLength < phoneNumber.length) {
			phoneNumber += "-";
		}
	}

	if (phoneNumber.length >= 9) {
		if (!phoneNumber.includes("-")) {
			const temp1 = phoneNumber.substr(0, 3);
			const temp2 = phoneNumber.substr(3, 3);
			const temp3 = phoneNumber.substr(6, 4);
			phoneNumber = `${temp1}-${temp2}-${temp3}`;
		} else if (phoneNumber[7] !== "-") {
			const temp1 = phoneNumber.substr(0, 3);
			const temp2 = phoneNumber.substr(4, 3);
			const temp3 = phoneNumber.substr(7, 4);
			phoneNumber = `${temp1}-${temp2}-${temp3}`;
		}
	}
	if (phoneNumber.length > 12) {
		phoneNumber = phoneNumber.slice(0, 12);
	}
	return phoneNumber;
}
function isTuesday(date) {
	const temp = date.split("-");
	const newDate = new Date(
		Number(temp[0]),
		Number(temp[1]) - 1,
		Number(temp[2])
	);
	return newDate.getDay() === 2;
}
function isPast(date) {
	const temp = date.split("-");
	const newDate = new Date(
		Number(temp[0]),
		Number(temp[1]) - 1,
		Number(temp[2]) + 1
	);

	return newDate.getTime() < new Date().getTime();
}
function isTimeValid(time, date) {
	if (date === today()) {
		const now = new Date();
		const timeArr = time.split(":");
		const hour = Number(timeArr[0]);
		const min = Number(timeArr[1]);
		if (now.getHours() >= hour) {
			if (now.getHours() == hour) {
				if (now.getMinutes() < min) {
					return true;
				}
				return false;
			}
		}
	}
	return true;
}
function isTimeOpen(time) {
	const timeArr = time.split(":");
	const hour = Number(timeArr[0]);
	const min = Number(timeArr[1]);
	if (hour >= 10) {
		if (hour === 10 && min < 30) {
			return false;
		}
		if (hour >= 21) {
			if (hour === 21 && min <= 30) {
				return true;
			}
			return false;
		}
		return true;
	}
	return false;
}
module.exports = {
	isPast,
	isTuesday,
	isTimeValid,
	isTimeOpen,
	mobileValidate,
	theValidator,
	tableValidator,
	assignValidator,
};
