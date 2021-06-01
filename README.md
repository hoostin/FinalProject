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

## `/reservations`

<hr>

### GET: `?date=YYYY-MM-DD`

Returns a list of reservations made for that date.

### GET: `?mobile_number={some-number}` full or partial phone number

Returns a list of reservations that at least partially match the number query.

<i>Shape of response.data from both requests above:</i>

```
[
    {
        reservation_id: 22,
        first_name: "Austin",
        last_name: "Mckee",
        mobile_number: "456-345-9999",
        reservation_date: "2022-03-17",
        reservation_time: "12:30",
        people: 2,
        status: "booked"
    },
    {
        reservation_id: 23,
        first_name: "Johnny",
        last_name: "Appleseed",
        mobile_number: "123-123-5689",
        reservation_date: "2022-03-16",
        reservation_time: "21:00",
        people: 5,
        status: "booked"
    },
]
```

### POST

A request body is needed for this route. The body of your request should look like this:

```
request: {
    body: {
        data: {
            first_name: "Billy",
            last_name: "Madison",
            mobile_number: "123-456-7890",
            reservation_date: "2025-06-25",
            reservation_time: "13:30",
            people: 4,
            status: "booked"
        }
    }
}
```

### All requests that send a reservation object will have data validation to pass.<br>

- First name and last name have no constraints.
- The mobile number must be in hyphenated format. xxx-xxxx or xxx-xxx-xxxx.
- Date must be in the format YYYY-MM-DD. Also, the date must occur either on the current day or in the future.
- The time must be in 24H (HH:MM) format. Also, if the date property is on today's date, the time must not have passed on that day when the request is made.
- People must be an integer greater than 0.

Returns status 201 and the created reservation object.<br><br>

## `/reservations/:reservation_id`

<hr>

### GET

If the reservation defined in the request URL exists, it returns the reservation object.

```
{
    reservation_id: 7,
    first_name: "Austin",
    last_name: "Mckee",
    mobile_number: "777-888-9999",
    reservation_date: "2022-03-12",
    reservation_time: "11:30",
    people: 2,
    status: "booked"
}
```

### PUT

A request body is needed. The body of the request should resemble:

```
data: {
    first_name: "Jane",
    last_name: "Appleseed",
    mobile_number: "123-123-1231",
    reservation_date: "2021-07-26",
    reservation_time: "18:00",
    people: 2,
    status: "booked"
}
```

Returns status 200 and the updated reservation.<br><br>

## `/reservations/:reservation_id/status`

<hr>

### PUT

The body of the request must resemble:

```
data: { status: "booked" }
```

Returns status 200 and the updated reservation object.
<br><br>

## `/tables`

<hr>

### GET

Returns a list of all tables in the database.

```
[
  {
    table_id: 12,
    table_name: "Bar #4",
    capacity: 3,
    reservation_id: null
  },
  {
    table_id: 13,
    table_name: "Bar #5",
    capacity: 3,
    reservation_id: 7
  },
  ...
]
```

### POST

Body of the request must resemble:

```
data : {
    table_name: "#7",
    capacity: 6,
    reservation_id: 12
}
```

- table_name does not need to include a # sign, but it must be a string greater than one character.
- capacity must be an integer greater than 0.
- reservation_id is optional, but if one is passed, it must be the ID of a reservation that does exist in the database.

Returns 201 and the created table.
<br><br>

## `/tables/:table_id`

<hr>

### GET

If the table defined in the request URL exists, it returns the table object.
Response looks like:

```
data: {
    table_id: 12,
    table_name: "Bar #4",
    capacity: 3,
    reservation_id: null
}
```

<br>

## `/tables/:table_id/seat`

<hr>

### PUT

If the table_id passed in the parameters exists, the reservation_id passed in the body exists, and the table is currently not occupied as well as the reservation belonging to the reservation_id is only booked, and not seated, finished, or cancelled: the table will be updated with the reservation_id passed.<br>

Request body looks like this:

```
data: { reservation_id: 12 }
```

When the table is updated with a reservation_id, that means the reservation is now seated at a table. Accordingly, the reservation's status will also be updated to reflect its "seated" status.<br>
Returns status 200 and the updated <i>reservation</i>, not the table.

```
data: {
    reservation_id: 5,
    first_name: "Michael",
    last_name: "Scott,
    mobile_number: "981-123-4567",
    reservation_date: "2007-04-20",
    reservation_time: "18:00",
    people: 6,
    status: "seated"
}
```

### DELETE

If the table exists, and the table has a reservation_id property that is not null or undefined, the table's reservation_id property will be nullified.

Returns status 200 and the updated reservation object associated with the change to the table.

```
data: {
    reservation_id: 62,
    first_name: "Walter",
    last_name: "White",
    mobile_number: "505-737-4253",
    reservation_date: "2030-09-25",
    reservation_time: "14:00",
    people: 1,
    status: "finished"
}
```

<br>