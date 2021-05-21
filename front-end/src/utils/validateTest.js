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
module.exports = { isPast, isTuesday, isTimeValid, isTimeOpen };
