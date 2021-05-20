import React, { useEffect, useState } from "react";

export default function ReservationForm() {
	const formChange = (event) => {
		const changeObj = { ...formData };
		changeObj[event.target.id] = event.target.value;
		setFormData(changeObj);
	};
	const [formData, setFormData] = useState({
		first_name: "John",
		last_name: "Smith",
		mobile_number: null,
		reservation_date: null,
		reservation_time: null,
	});
	return (
		<form name="reservation">
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
				></input>
				<label htmlFor="mobile_number">Phone Number</label>
				<input
					id="mobile_number"
					type="text"
					name="mobile_number"
					onChange={formChange}
					value={formData.mobile_number}
					placeholder="xxx-xxx-xxxx"
					className="form-control"
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
			</div>
		</form>
	);
}
