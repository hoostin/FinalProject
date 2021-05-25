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
module.exports = {
	create,
	listByName,
};
