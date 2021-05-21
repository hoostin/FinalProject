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

module.exports = { isPast, isTuesday };
