import React, { useState } from "react";
import { createReservations } from "./utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "./layout/ErrorAlert";

import { mobileValidate, theValidator } from "./utils/validate";
export default function ReservationForm() {
	const history = useHistory();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: 1,
	});
	const [error, setError] = useState(null);
	const formChange = (event) => {
		const changeObj = { ...formData };
		if (event.target.id === `mobile_number`) {
			let phoneNumber = event.target.value;
			phoneNumber = mobileValidate(phoneNumber, formData.mobile_number.length);
			event.target.value = phoneNumber;
		}

		changeObj[event.target.id] = event.target.value;
		changeObj.people = Number(changeObj.people);
		setFormData(changeObj);
	};

	const theSubmit = (event) => {
		event.preventDefault();
		const abortController = new AbortController();

		if (theValidator(formData, setError)) {
			createReservations(formData, abortController.signal)
				.then(() =>
					history.push(`/dashboard?date=${formData.reservation_date}`)
				)
				.catch((err) => {
					setError(err);
				});
		}
	};

	return (
		<div>
			{error ? <ErrorAlert error={error} /> : null}
			<h2>New Reservation</h2>
			<form name="reservation" onSubmit={theSubmit}>
				<div className="form-group">
					<label htmlFor="first_name">First Name</label>
					<input
						id="first_name"
						type="text"
						name="first_name"
						onChange={formChange}
						value={formData.first_name}
						placeholder="John"
						className="form-control"
						required
					></input>
					<label htmlFor="last_name">Last Name</label>
					<input
						id="last_name"
						type="text"
						name="last_name"
						onChange={formChange}
						value={formData.last_name}
						placeholder="Smith"
						className="form-control"
						required
					></input>
					<label htmlFor="mobile_number">Phone Number</label>
					<input
						id="mobile_number"
						type="text"
						name="mobile_number"
						onChange={formChange}
						value={formData.mobile_number}
						placeholder="xxx-xxx-xxxx or xxx-xxxx"
						className="form-control"
						pattern="([0-9]{3}-)?[0-9]{3}-[0-9]{4}"
						required
					></input>
					<label htmlFor="reservation_date">Reservation Date</label>
					<input
						id="reservation_date"
						name="reservation_date"
						onChange={formChange}
						value={formData.reservation_date}
						type="date"
						placeholder="YYYY-MM-DD"
						pattern="\d{4}-\d{2}-\d{2}"
						className="form-control"
						required
					/>

					<label htmlFor="reservation_time">Reservation Time</label>
					<input
						id="reservation_time"
						name="reservation_time"
						onChange={formChange}
						value={formData.reservation_time}
						type="time"
						placeholder="HH:MM"
						pattern="[0-9]{2}:[0-9]{2}"
						className="form-control"
					/>
					<label htmlFor="people">Party Size</label>
					<input
						id="people"
						name="people"
						onChange={formChange}
						value={formData.people}
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
