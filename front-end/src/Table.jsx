export default function Table({ data }) {
	return (
		<div className="card ">
			<div className="card-body">
				<h5 className="card-title">Table: {`${data.table_name}`}</h5>
				<p className="card-text">Capacity: {data.capacity}</p>
				<p
					className={
						data.reservation_id
							? "card-text text-danger"
							: "card-text text-success"
					}
				>
					{data.reservation_id ? "Occupied" : "Free"}
				</p>
			</div>
		</div>
	);
}
//{data.reservation_id ? "red" : "green"}
