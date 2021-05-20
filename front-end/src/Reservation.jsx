export default function Reservation({ data }) {
	return (
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">
					Reservation for: {`${data.first_name} ${data.last_name}`}{" "}
				</h5>
				<p class="card-text">Phone Number: {data.mobile_number}</p>
				<p class="card-text">Time: {data.reservation_time}</p>
				<p class="card-text">Party Size: {data.people}</p>
				{/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
			</div>
		</div>
	);
}
