const knex = require("../db/connection");
const tableName = "tables";

function listByName() {
	return knex(tableName).select("*").orderBy("table_name", "asc");
}
function create(data) {
	return knex(tableName)
		.insert(data)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}
function update(table_id, reservation_id) {
	return knex(tableName)
		.where({ table_id })
		.update("reservation_id", reservation_id)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}
function read(table_id) {
	return knex(tableName)
		.where({ table_id })
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}
module.exports = {
	create,
	listByName,
	update,
	read,
};
