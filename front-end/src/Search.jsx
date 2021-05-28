import React, { useState } from "react";
import { searchReservation } from "./utils/api";
import Reservation from "./Reservation";
const { mobileValidate } = require("./utils/validateTest");

export default function Search() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [reservations, setReservations] = useState([]);
	const [submit, setSubmit] = useState(false);
	const phoneChange = (event) => {
		let phoneNumber1 = event.target.value;
		phoneNumber1 = mobileValidate(phoneNumber1, phoneNumber.length);
		event.target.value = phoneNumber1;
		setPhoneNumber(phoneNumber1);
	};
	const theSubmit = (event) => {
		event.preventDefault();

		searchReservation(phoneNumber)
			.then((data) => {
				setReservations(data);
			})
			.then(setSubmit(true));
	};
	return (
		<div>
			<h2>Search</h2>
			<form name="reservation" onSubmit={theSubmit}>
				<input
					className="form-control col-4"
					type="text"
					name="mobile_number"
					placeholder="Enter a customer's phone number"
					onChange={phoneChange}
					value={phoneNumber}
				></input>
				<button type="submit" className="btn btn-primary">
					Find
				</button>
			</form>
			{submit ? (
				reservations.length ? (
					<div>
						{reservations.map((reservation) =>
							reservation.status === " finished" ? null : (
								<Reservation data={reservation} />
							)
						)}
					</div>
				) : (
					<div> No reservations found</div>
				)
			) : null}
		</div>
	);
}
