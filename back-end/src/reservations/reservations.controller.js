/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const { theValidator } = require("../../../front-end/src/utils/validateTest");

async function list(req, res) {
	if (req.query.date) {
		const reservations = await service.listByDate(req.query.date);
		return res.json({
			data: [...reservations],
		});
	} else if (req.query.mobile_number) {
		const reservations = await service.search(req.query.mobile_number);
		return res.json({
			data: [...reservations],
		});
	}
}
async function validate(req, res, next) {
	const added = req.body.data;
	// console.log(added);
	let message;
	function setError(err) {
		if (err) message = err.message;
	}
	if (!added) {
		return next({
			status: 400,
			message:
				"Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}",
		});
	}
	if (added.status !== `booked`) {
		if (!added.status) req.body.data.status = "booked";
		else {
			return next({
				status: 400,
				message: `Invalid data format provided. ${added.status} `,
			});
		}
	}
	if (!theValidator(added, setError) || typeof added.people != "number") {
		if (!message) {
			message = "people must be a number";
		}

		return next({ status: 400, message });
	} else {
		return next();
	}
}
async function create(req, res) {
	const added = await service.create(req.body.data);
	res.status(201).json({ data: added });
}
async function read(req, res, next) {
	const reservation = await service.read(req.params.id);
	if (!reservation)
		return next({ status: 404, message: `${req.params.id} doesnt exist` });
	res.json({
		data: reservation,
	});
}
async function validateUpdate(req, res, next) {
	const { id } = req.params;
	const { status } = req.body.data;
	const reservation = await service.read(id);
	if (status === "unknown")
		return next({
			status: 400,
			message: `${status} status doesnt exist but at least you tried`,
		});
	if (!reservation) {
		return next({
			status: 404,
			message: `${id} doesnt exist but at least you tried`,
		});
	}
	if (reservation.status === "finished") {
		return next({ status: 400, message: "its finished you are too late " });
	}
	next();
}

async function updateValidateRes(req, res, next) {
	const { id } = req.params;
	const test2 = {
		first_name: null,
		last_name: null,
		mobile_number: null,
		reservation_date: null,
		reservation_time: null,
		people: 0,
		status: "",
	};
	let temp = {};
	for (let key in req.body.data) {
		if (Object.keys(test2).includes(key)) {
			temp[key] = req.body.data[key];
		}
	}
	req.body.data = temp;
	const reservation = await service.read(id);
	if (!reservation)
		return next({ status: 404, message: `${id} does not exist` });
	next();
}
async function update(req, res) {
	const { id } = req.params;
	const { status } = req.body.data;
	const updated = await service.update(id, status);
	res.status(200).json({ data: updated });
}
async function updateReservation(req, res) {
	const { id } = req.params;
	const reservation = req.body.data;

	const updated = await service.updateReservation(id, reservation);
	res.status(200).json({ data: updated });
}
module.exports = {
	list: asyncErrorBoundary(list),
	create: [asyncErrorBoundary(validate), asyncErrorBoundary(create)],
	read: asyncErrorBoundary(read),
	update: [asyncErrorBoundary(validateUpdate), asyncErrorBoundary(update)],
	updateReservation: [
		asyncErrorBoundary(updateValidateRes),
		asyncErrorBoundary(validate),
		asyncErrorBoundary(updateReservation),
	],
};
