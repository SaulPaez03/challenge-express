const express = require("express");
const {
	getClients,
	setAppointment,
	setAppointmentStatus,
	eraseAppointment,
	getAppointments,
	getClientList,
} = require("../Controllers/apiControllers");

// import all controllers
// import SessionController from './app/controllers/SessionController';

const api = new express.Router();

// Add api
api.get("/", getClients);
api.post("/Appointments", setAppointment);
api.get("/Appointments/clients", getClientList);

api.get("/Appointments/:name", setAppointmentStatus);
api.get("/Appointments/:name/erase", eraseAppointment);
api.get("/Appointments/getAppointments/:name", getAppointments);

// api.put('/', SessionController.store);
// api.delete('/', SessionController.store);

module.exports = api;
