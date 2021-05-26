import { useHistory } from "react-router";
import React, { useState } from "react";
import ErrorAlert from "./layout/ErrorAlert";
import { createTables } from "./utils/api";

const { tableValidator } = require("./utils/validateTest");

export default function TableForm() {
	const history = useHistory();
	const [formData, setFormData] = useState({
		table_name: "",
		capacity: 1,
		reservation_id: null,
	});
	const [error, setError] = useState(null);
	const formChange = (event) => {
		const changeObj = { ...formData };
		changeObj[event.target.id] = event.target.value;
		changeObj.capacity = Number(changeObj.capacity);
		setFormData(changeObj);
	};
	const theSubmit = (event) => {
		event.preventDefault();
		const abortController = new AbortController();
		// create these api / validate functions
		if (tableValidator(formData, setError)) {
			createTables(formData, abortController.signal)
				.then(() => history.push(`/dashboard`))
				.catch((err) => {
					setError(err);
				});
		}
	};
	return (
		<div>
			{error ? <ErrorAlert error={error} /> : null}
			<h2>New Table</h2>
			<form name="table" onSubmit={theSubmit}>
				<div className="form-group">
					<label htmlFor="table_name">Table Name</label>
					<input
						id="table_name"
						type="text"
						name="table_name"
						onChange={formChange}
						value={formData.table_name}
						placeholder="Table Name"
						className="form-control"
						required
					></input>

					<label htmlFor="capacity">Capacity</label>
					<input
						id="capacity"
						name="capacity"
						onChange={formChange}
						value={formData.capacity}
						type="number"
						className="form-control"
						min="1"
						required
					/>
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
