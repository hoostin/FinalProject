# Austin Mckee - Periodic Tables

This is My Thinkful Capstone Project. This project is a PERN-Stack (PostgreSQL, Express, React, and Node. js.) application that represents a Reservation System for a restaurant called Periodic Tables. This application gives users the ability to create/edit reservations, seat a reservation at a table, create tables, and search for a reservation by phone number.

# React Application

## `/dashboard` And `/dashboard?date=YYYY-MM-DD` - Home Page

This page displays the reservations for a specific date that aren't `completed` or `cancelled` as well as displaying all tables. The default date if no date is given is the current date.
### insert `screenshot` here

## `/search`
This page allows the user to search for a reservation by phone number either partial or full phone number then shows a list of matching reservations.
### insert before search `screenshot`

### insert after search `screenshot`

## `/reservations/new`
This route displays a form that allows the user to create a new reservation.

Once a new reservation has been submitted successfully it will redirect to the dashboard/`date of new reservation` displaying the new reservation and all other reservations for that date.

### insert before submit `screenshot`

### insert after submit `screenshot`

## `/reservations/:reservation_id/edit`
This route is called by clicking `edit` on an existing reservation that has the status `booked` (no other status can be edited). Once edit is clicked it goes to a form identical to the new reservation form but with current values filled in. When successfully submitted the form redirects to the dashboard/`date of reservation`.
### insert dashboard edit `screenshot`

### insert before submit `screenshot`

### insert after submit `screenshot`

## `/reservations/:reservation_id/seat`
This route is called by clicking `seat` on an existing reservation that has the status `booked` (no other status can be seated). Displays a form to assign a reservation a table. After the form is successfully submitted it redirects to dashboard. After a table has been seated the table should show `Occupied` and display a `Finish` button that when clicked finishes the reservation (which hides the reservation) then changes table's status to `free`.

### insert dashboard seat `screenshot`

### insert before submit `screenshot`

### insert after submit `screenshot`

### insert finish button `screenshot`

## `/tables/new`
This route displays a form to create a new table. 

Once a new table has been submitted successfully it will redirect to the dashboard/`current-date` displaying the new table .
### insert before submit `screenshot`

### insert after submit `screenshot`

# API Documentation 

##