import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import ErrorAlert from "./layout/ErrorAlert";
import { listTables } from "./utils/api";
import { useRouteMatch } from "react-router-dom";

export default function ReservationSeatForm() {
	// get tables
	// get reservation id from url
	// useRouteMatch
	const [formData, setFormData] = useState({ table_name: "" });
	const theSubmit = (event) => {
		event.preventDefault();
		const abortController = new AbortController();
	};
	const { params } = useRouteMatch();
	const { reservation_id } = params;
	const history = useHistory();

	const [tables, setTables] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => listTables().then(setTables), []);
	return (
		<div>
			{error ? <ErrorAlert error={error} /> : null}
			<h2>Assign Table</h2>
			<form name="seat_form" onSubmit={theSubmit}>
				<div className="form-group">
					<label htmlFor="table_id">Table Name</label>
					<select
						id="table_id"
						type="text"
						name="table_id"
						value={formData.table_name}
						placeholder="Table Name"
						className="form-control"
						required
					>
						{tables.map((table) => {
							return (
								<option>
									{table.table_name} - {table.capacity}
								</option>
							);
						})}
					</select>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				<button onClick={() => history.goBack()} className="btn btn-danger">
					Cancel
				</button>
			</form>
		</div>
	);
}
