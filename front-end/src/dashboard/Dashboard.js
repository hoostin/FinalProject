import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import useQuery from "../utils/useQuery";
import Reservation from "../Reservation";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);
	const query = useQuery();
	const theDate = query.get("date");
	const history = useHistory();
	useEffect(() => {
		if (!theDate) history.push(`/dashboard?date=${date}`);
	}, [query, history, theDate, date]);
	useEffect(loadDashboard, [date]);
	useEffect(() => {}, [reservations]);
	function loadDashboard() {
		if (theDate !== date) {
			history.push(`/dashboard?date=${date}`);
		}
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date }, abortController.signal)
			.then(setReservations)
			.catch(setReservationsError);
		return () => abortController.abort();
	}
	function changeDateUrl(scalar) {
		const temp = date.split("-");
		const newDate = new Date(
			Number(temp[0]),
			Number(temp[1]) - 1,
			Number(temp[2]) + scalar
		)
			.toISOString()
			.split("T")[0];
		history.push(`/dashboard?date=${newDate}`);
	}
	return (
		<main>
			<h1>Dashboard</h1>
			<div className="d-md-flex mb-3">
				<h4 className="mb-0">Reservations for date: {date}</h4>
			</div>
			<ErrorAlert error={reservationsError} />
			{reservations.map((reservation) => (
				<Reservation data={reservation} />
			))}
			<div>
				<button
					onClick={() => {
						changeDateUrl(1);
					}}
					className="btn btn-primary"
				>
					Next
				</button>
				<button
					onClick={() => {
						changeDateUrl(-1);
					}}
					className="btn btn-secondary"
				>
					Previous
				</button>
				<button
					onClick={() => {
						history.push(`/dashboard`);
					}}
					className="btn btn-info"
				>
					Today
				</button>
			</div>
		</main>
	);
}

export default Dashboard;
