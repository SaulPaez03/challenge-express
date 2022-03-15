var express = require("express");

var server = express();
var bodyParser = require("body-parser");
const api = require("./Routes/api");

server.use(bodyParser.json());
server.use("/api", api);
server.post("api/");
server.listen(3000);
module.exports = { server };
