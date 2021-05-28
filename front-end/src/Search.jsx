import React, { useState } from "react";
const { mobileValidate } = require("./utils/validateTest");

export default function Search() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const phoneChange = (event) => {
		let phoneNumber1 = event.target.value;
		phoneNumber1 = mobileValidate(phoneNumber1, phoneNumber.length);
		event.target.value = phoneNumber1;
		setPhoneNumber(phoneNumber1);
	};
	return (
		<div>
			<input
				className="form-control"
				type="text"
				name="mobile_number"
				placeholder="Enter a customer's phone number"
				onChange={phoneChange}
				value={phoneNumber}
			></input>
		</div>
	);
}
