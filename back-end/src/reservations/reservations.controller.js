/**
 * List handler for reservation resources
 */
//const { whereNotExists } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const theValidator = require("../../../front-end/src/utils/validateTest");
//const { isPast, isTuesday } = require("../../../front-end/src/utils/validate");

async function list(req, res) {
	const reservations = await service.listByDate(req.query.date);
	res.json({
		data: [...reservations],
	});
}
function compareKeys(a, b) {
	const aKeys = Object.keys(a).sort();
	const bKeys = Object.keys(b).sort();
	return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}
async function validate(req, res, next) {
	const added = req.body.data;
	if (!added)
		next({
			status: 400,
			message:
				"Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}",
		});
	const test = {
		first_name: null,
		last_name: null,
		mobile_number: null,
		reservation_date: null,
		reservation_time: null,
		people: 0,
	};
	//console.log(added);
	if (compareKeys(added, test)) {
		for (let theValue in added) {
			if (theValue === `people`) {
				console.log(added[theValue]);
				if (typeof added[theValue] != `number`) {
					return next({
						status: 400,
						message: "people must be a number ",
					});
				}
			}
			if (theValue === `reservation_date`) {
				if (!/\d{4}-\d{2}-\d{2}/.test(added[theValue])) {
					return next({
						status: 400,
						message: "reservation_date must be a date ",
					});
				}
				if (theValidator.isPast(added[theValue]))
					return next({
						status: 400,
						message: "reservation_date must be a date in the future ",
					});
				if (theValidator.isTuesday(added[theValue]))
					return next({
						status: 400,
						message:
							"reservation_date must not be a Tuesday we're closed ",
					});
			}
			if (theValue === `reservation_time`) {
				if (!/[0-9]{2}:[0-9]{2}/.test(added[theValue])) {
					return next({
						status: 400,
						message: "reservation_time must be a time ",
					});
				}
				if (!theValidator.isTimeOpen(added[theValue])) {
					return next({
						status: 400,
						message: "Closed only open 10:30 AM - 10:30 PM with 1hr window",
					});
				}
				if (!theValidator.isTimeValid(added[theValue])) {
					return next({
						status: 400,
						message: " Must be in Future ",
					});
				}
			}
			if (!added[theValue])
				return next({
					status: 400,
					message:
						"Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}",
				});
		}
		return next();
	}
	next({
		status: 400,
		message:
			"Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}",
	});
}
async function create(req, res) {
	const added = await service.create(req.body.data);
	res.status(201).json({ data: added });
}
module.exports = {
	list: asyncErrorBoundary(list),
	create: [asyncErrorBoundary(validate), asyncErrorBoundary(create)],
};
