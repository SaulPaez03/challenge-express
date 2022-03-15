const statusList = ["pending", "attended", "expired", "cancelled"];

var model = {
	clients: {},
	reset() {
		this.clients = {};
	},
	addAppointment(key, { date }) {
		if (this.clients.hasOwnProperty(key)) {
			this.clients[key].push({ status: "pending", date });
		} else {
			this.clients[key] = [{ status: "pending", date }];
		}
	},
	attend(key, date) {
		this.clients[key].find((e) => e.date === date).status = "attended";
	},
	expire(key, date) {
		this.clients[key].find((e) => e.date === date).status = "expired";
	},
	cancel(key, date) {
		this.clients[key].find((e) => e.date === date).status = "cancelled";
	},
	erase(key, value) {
		let property = statusList.includes(value) ? "status" : "date";
		let erased = [];
		this.clients[key] = this.clients[key].filter((appointment) => {
			if (appointment[property] === value) {
				erased.push(appointment);
			}
			return appointment[property] !== value;
		});
		return erased;
	},
	getAppointments(key, status = undefined) {
		return status
			? this.clients[key].filter((e) => e.status === status)
			: this.clients[key];
	},
	getClients() {
		return Object.keys(this.clients);
	},
};

const getClients = (req, res) => {
	res.send(model.clients);
};

const setAppointment = (req, res) => {
	let { client, appointment } = req.body;
	if (client === undefined) {
		return res.status(400).send("the body must have a client property");
	}
	if (typeof client !== "string") {
		return res.status(400).send("client must be a string");
	}
	model.addAppointment(client, appointment);
	res.send(model.clients[client][model.clients[client].length - 1]);
};
const setAppointmentStatus = (req, res) => {
	let { name } = req.params;
	let { date, option } = req.query;

	if (!model.getClients().includes(name))
		return res.status(400).send("the client does not exist");

	let appointments = model.clients[name].filter((e) => e.date === date);
	if (!appointments.length) {
		return res
			.status(400)
			.send("the client does not have a appointment for that date");
	}
	switch (option) {
		case "attend":
			model.attend(name, date);
			res.send(appointments[0]);
			break;
		case "cancel":
			model.cancel(name, date);
			res.send(appointments[0]);
			break;
		case "expire":
			model.expire(name, date);
			res.send(appointments[0]);
			break;
		default:
			res.status(400).send("the option must be attend, expire or cancel");
	}
};

const eraseAppointment = (req, res) => {
	let { name } = req.params;
	let { date } = req.query;
	if (!model.getClients().includes(name))
		return res.status(400).send("the client does not exist");

	res.send(model.erase(name, date));
};

const getAppointments = (req, res) => {
	let { name } = req.params;
	let { status } = req.query;
	console.log(req.query);
	res.send(model.getAppointments(name, status));
};
const getClientList = (req, res) => {
	res.send(model.getClients());
};

module.exports = {
	model,
	getClients,
	setAppointment,
	setAppointmentStatus,
	eraseAppointment,
	getAppointments,
	getClientList,
};
