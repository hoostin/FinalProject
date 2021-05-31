import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationForm from "../ReservationForm";
import useQuery from "../utils/useQuery";
import TableForm from "../TableForm";
import ReservationSeatForm from "../ReservationSeatForm";
import Search from "../Search";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
	const query = useQuery();
	const date = query.get("date");
	return (
		<Switch>
			<Route exact={true} path="/">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route exact={true} path="/reservations">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route exact={true} path="/reservations/new">
				<ReservationForm />
			</Route>
			<Route exact={true} path="/reservations/:reservation_id/edit">
				<ReservationForm />
			</Route>
			<Route exact={true} path="/reservations/:reservation_id/seat">
				<ReservationSeatForm />
			</Route>
			<Route exact={true} path="/tables/new">
				<TableForm />
			</Route>
			<Route path="/dashboard">
				<Dashboard date={date ? date : today()} />
			</Route>
			<Route path="/search">
				<Search />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default Routes;
