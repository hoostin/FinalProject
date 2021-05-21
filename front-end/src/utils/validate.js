import { today } from "./date-time";

export function mobileValidate(phoneNumber, currentLength) {
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

export function isTuesday(date) {
	const temp = date.split("-");
	const newDate = new Date(
		Number(temp[0]),
		Number(temp[1]) - 1,
		Number(temp[2])
	);
	return newDate.getDay() === 2;
}
export function isPast(date) {
	const temp = date.split("-");
	const newDate = new Date(
		Number(temp[0]),
		Number(temp[1]) - 1,
		Number(temp[2])+1
	);

	return newDate.getTime() < new Date().getTime();
}
export function isTimeValid(time, date) {
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
export function isTimeOpen(time) {
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
