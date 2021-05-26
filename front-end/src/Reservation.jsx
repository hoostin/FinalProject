export default function Reservation({ data }) {
	return (
		<div className="card ">
			<div className="card-body">
				<h5 className="card-title">
					Reservation for: {`${data.first_name} ${data.last_name}`}{" "}
				</h5>
				<p className="card-text">Phone Number: {data.mobile_number}</p>
				<p className="card-text">Time: {data.reservation_time}</p>
				<p className="card-text">Party Size: {data.people}</p>
				<a
					href={`/reservations/${data.reservation_id}/seat`}
					className="btn btn-primary"
				>
					Seat
				</a>
			</div>
		</div>
	);
}
