import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import ErrorAlert from "./layout/ErrorAlert";
import { listTables, getReservation, assignReservation } from "./utils/api";
import { useRouteMatch } from "react-router-dom";
import { assignValidator }  from "./utils/validate";
export default function ReservationSeatForm() {
	// get tables
	// get reservation id from url
	// useRouteMatch
	const [formData, setFormData] = useState({
		table_name: "",
		capacity: null,
		table_id: null,
	});
	const [reservation, setReservation] = useState({});
	const theSubmit = (event) => {
		event.preventDefault();

		const abortController = new AbortController();
		if (assignValidator(formData, reservation, setError)) {
			// call api function to assign reservation to a table
			assignReservation(
				formData.table_id,
				reservation_id,
				abortController.signal
			)
				.then(() => history.push("/dashboard"))
				.catch((err) => {
					setError(err);
				});
		}
	};
	const onChange = (event) => {
		const value = event.target.value;
		console.log(event.target.id);
		const valueArr = value.split(",");
		const valueObj = {
			table_name: valueArr[0],
			capacity: valueArr[1],
			table_id: valueArr[2],
		};
		setFormData(valueObj);
	};
	const { params } = useRouteMatch();
	const { reservation_id } = params;
	const history = useHistory();

	const [tables, setTables] = useState([]);
	const [error, setError] = useState(null);
	useEffect(
		() =>
			listTables()
				.then(setTables)
				.then(getReservation(reservation_id).then(setReservation)),
		[]
	);
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
						value={[formData.table_name, formData.capacity, formData.table_id]}
						className="form-control"
						onChange={onChange}
						required
					>
						<option value={[null, null]}> Select Table </option>
						{tables.map((table) => {
							return (
								<option
									value={[table.table_name, table.capacity, table.table_id]}
								>
									{table.table_name} - {table.capacity}
								</option>
							);
						})}
					</select>
				</div>

				<button type="submit" className="btn btn-primary mr-1">
					Submit
				</button>
				<button onClick={() => history.goBack()} className="btn btn-danger">
					Cancel
				</button>
			</form>
		</div>
	);
}
