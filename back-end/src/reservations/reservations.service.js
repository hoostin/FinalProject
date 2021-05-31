const knex = require("../db/connection");
const tableName = "reservations";

function listByDate(date) {
	return knex(tableName)
		.select("*")
		.where({ "reservations.reservation_date": date })
		.whereNot({ "reservations.status": "finished" })
		.orderBy("reservation_time", "asc");
}
function create(data) {
	return knex(tableName)
		.insert(data)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}
function read(id) {
	return knex(tableName)
		.where({ "reservations.reservation_id": id })
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}
function update(id, status) {
	return knex(tableName)
		.where({ reservation_id: id })
		.update("status", status)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}
function updateReservation(id, reservation) {
	return knex(tableName)
		.where({ reservation_id: id })
		.update(reservation)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}
function search(mobile_number) {
	return knex(tableName)
		.whereRaw(
			"translate(mobile_number, '() -', '') like ?",
			`%${mobile_number.replace(/\D/g, "")}%`
		)
		.orderBy("reservation_date");
}
module.exports = {
	listByDate,
	create,
	read,
	update,
	updateReservation,
	search,
};
