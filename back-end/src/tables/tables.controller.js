const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const { tableValidator } = require("../../../front-end/src/utils/validateTest");

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
async function create(req, res) {
	const added = await service.create(req.body.data);
	res.status(201).json({ data: added });
}
module.exports = {
	list: asyncErrorBoundary(list),
	create: [asyncErrorBoundary(validate), asyncErrorBoundary(create)],
};