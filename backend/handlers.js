"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const data = require("./data");

//  Use this data. Changes will persist until the server (backend) restarts.
let { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  const data = flights;
  // console.log(data);
  res.status(200).json({
    status: 200,
    data,
  });
};

const getFlight = (req, res) => {
  const id = req.params.id;
  const flightArray = Object.keys(flights);
  const flight = flightArray.filter((flight) => {
    return id === flight.id;
  });
  if (flight) {
    res.status(200).json({
      status: 200,
      data: flights[id],
    });
  } else {
    res.status(400).json({
      status: 400,
      error: "Flight not found ...",
      data: req.params,
    });
  }
};

const addReservations = (req, res) => {
  const reservation = { id: uuidv4(), ...req.body };
  console.log(reservation.flightNumber);
  flights[reservation.flightNumber].forEach((seat) => {
    if (seat.id === reservation.seat) {
      seat.isAvailable = false;
    }
  });

  reservations.push(reservation);
  console.log("reservation", reservation);
  res.status(201).json({
    status: 201,
    message: "Reservation added.",
    data: { reservation },
  });
};

const getReservations = (req, res) => {
  res.status(200).json({
    status: 200,
    data: reservations,
  });
};

const getSingleReservation = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const reservation = reservations.find((searchRes) => {
    return id === searchRes.id;
  });
  // console.log(reservationId);
  if (reservation) {
    res.status(200).json({
      status: 200,
      data: reservation,
    });
  } else {
    res.status(400).json({
      status: 400,
      error: "Reservation not found ...",
      data: reservation,
    });
  }
};

const deleteReservation = (req, res) => {
  const id = req.params.id;
  const reservationToDelete = reservations.find((searchItem) => {
    return id === searchItem.id;
  });
  // console.log("res to delete", reservationToDelete);
  if (reservationToDelete) {
    const reservationIndex = reservations.indexOf(reservationToDelete[0]);
    flights[reservationToDelete.flightNumber].forEach((seat) => {
      if (seat.id === reservationToDelete.seat) {
        seat.isAvailable = true;
      }
    });
    reservations.splice(reservationIndex, 1);
    res.status(200).json({
      status: 200,
      message: "Reservation successfully deleted.",
    });
  } else {
    res.status(400).json({
      status: 400,
      error: "Reservation not found ...",
      data: req.params,
    });
  }
};

const updateReservation = (req, res) => {
  //also get flights.id and update isAvailable to true
  //and new isAvailable to false
  let reservation = reservations.find(
    (reservation) => reservation.id === req.params.id
  );
  if (reservation) {
    reservation = { ...req.body };
    res.status(200).json({
      status: 200,
      message: "Reservation successfully updated.",
      data: reservation,
    });
  } else {
    res.status(400).json({
      status: 400,
      message: `Reservation at ${id} does not exist ...`,
      data: reservation,
    });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
