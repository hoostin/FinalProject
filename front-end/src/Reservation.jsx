export default function Reservation({ data }) {
	function cancelReservation(){
		if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")){

		}
	}
	return (
		<div className="card ">
			<div className="card-body">
				<h5 className="card-title">
					Reservation for: {`${data.first_name} ${data.last_name}`}{" "}
				</h5>
				<p className="card-text">Phone Number: {data.mobile_number}</p>
				<p className="card-text">Time: {data.reservation_time}</p>
				<p className="card-text">Party Size: {data.people}</p>
				<p data-reservation-id-status={data.reservation_id}>
					Status:{" "}
					<span
						className={
							data.status === "booked"
								? "card-text text-primary"
								: "card-text text-success"
						}
					>
						{data.status}
					</span>
				</p>
				{data.status === "booked" ? (
					<a
						href={`/reservations/${data.reservation_id}/seat`}
						className="btn btn-primary"
					>
						Seat
					</a>
					<a href={`/reservations/${data.reservation_id}/status`}
					className="btn btn-secondary "> Edit</a>
					<button onClick={cancelReservation}	className="btn btn-danger " data-reservation-id-cancel={reservation.reservation_id}>Cancel</button>
				) : null}
			</div>
		</div>
	);
}
