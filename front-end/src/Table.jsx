import Finish from "./Finish";
export default function Table({ data, setTables }) {
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
					<div>
						{data.reservation_id ? (
							<Finish tableId={data.table_id} setTables={setTables} />
						) : null}
					</div>
				</p>
			</div>
		</div>
	);
}
//{data.reservation_id ? "red" : "green"}
//
