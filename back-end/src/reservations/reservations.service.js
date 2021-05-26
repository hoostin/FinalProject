const knex = require("../db/connection");
const tableName = "reservations";

function listByDate(date) {
	return knex(tableName)
		.select("*")
		.where({ "reservations.reservation_date": date })
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
module.exports = {
	listByDate,
	create,
	read,
};
