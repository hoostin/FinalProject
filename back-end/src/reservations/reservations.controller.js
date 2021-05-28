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
	let message;
	function setError(err) {
		if (err) message = err.message;
	}
	if (!added)
		return next({
			status: 400,
			message:
				"Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}",
		});
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
async function read(req, res) {
	const reservation = await service.read(req.params.id);
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
async function update(req, res) {
	const { id } = req.params;
	const { status } = req.body.data;
	const updated = await service.update(id, status);
	res.status(200).json({ data: updated });
}
module.exports = {
	list: asyncErrorBoundary(list),
	create: [asyncErrorBoundary(validate), asyncErrorBoundary(create)],
	read: asyncErrorBoundary(read),
	update: [asyncErrorBoundary(validateUpdate), asyncErrorBoundary(update)],
};
