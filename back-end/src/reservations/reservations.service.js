const knex = require("../db/connection");
const tableName = "reservations";

function listByDate(date) {
	return knex(tableName)
		.select("*")
		.where({ "reservations.reservation_date": date });
}

module.exports = {
	listByDate,
};
