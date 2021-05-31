const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const { tableValidator } = require("../../../front-end/src/utils/validateTest");
const router = require("./tables.router");
const reservationService = require("../reservations/reservations.service");
async function list(req, res) {
	const tables = await service.listByName();
	res.json({
		data: [...tables],
	});
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
				"Invalid data format provided. Requires {string: table_name,  number: capacity}",
		});
	if (!tableValidator(added, setError) || typeof added.capacity != "number") {
		if (!message) {
			message = "capacity must be a number";
		}
		return next({ status: 400, message });
	} else {
		return next();
	}
}
async function updateValidate(req, res, next) {
	if (!req.body.data || !req.body.data.reservation_id) {
		return next({
			status: 400,
			message: "Invalid data format provided. Requires reservation_id",
		});
	}
	const reservation = await reservationService.read(
		req.body.data.reservation_id
	);
	res.locals.reservation = reservation;
	const table = await service.read(Number(req.params.table_id));
	if (!reservation) {
		return next({
			status: 404,
			message: `Invalid data format provided. Requires reservation_id ${req.body.data.reservation_id} to exist in database`,
		});
	}
	if (reservation.status === "seated")
		return next({
			status: 400,
			message: `reservation was already seated`,
		});
	if (table.capacity < reservation.people) {
		return next({
			status: 400,
			message: "capacity must be greater than people count",
		});
	}
	if (table.reservation_id) {
		return next({
			status: 400,
			message: "table is occupied",
		});
	}
	next();
}
async function create(req, res) {
	const added = await service.create(req.body.data);
	res.status(201).json({ data: added });
}
async function update(req, res) {
	const table_id = Number(req.params.table_id);
	const reservation_id = Number(req.body.data.reservation_id);
	await reservationService.update(reservation_id, "seated");
	const updated = await service.update(table_id, reservation_id);
	res.status(200).json({ data: updated });
}
async function destroyValidate(req, res, next) {
	const table = await service.read(Number(req.params.table_id));
	if (!table) {
		return next({
			status: 404,
			message: `table does not exist ${req.params.table_id} `,
		});
	}
	if (!table.reservation_id) {
		return next({
			status: 400,
			message: "table is not occupied",
		});
	}
	next();
}
async function destroy(req, res) {
	const table_id = Number(req.params.table_id);
	const table = await service.read(table_id);
	const updated = await service.update(table_id, null);
	await reservationService.update(table.reservation_id, "finished");
	res.status(200).json({ date: updated });
}
module.exports = {
	list: asyncErrorBoundary(list),
	create: [asyncErrorBoundary(validate), asyncErrorBoundary(create)],
	update: [asyncErrorBoundary(updateValidate), asyncErrorBoundary(update)],
	destroy: [asyncErrorBoundary(destroyValidate), asyncErrorBoundary(destroy)],
};
