"use strict";

const { required } = require("joi");

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("./logger");
const config = require("./config");
const cors = require("cors");
const api = require("./api");
const app = express();
app.use(logger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));
// in case if there is any error
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).end();
});
app.use("/api", api);
// open the server
app.listen(config.PORT, () => {
	console.log(
		`Listening to http://localhost:${config.PORT} (MODE: ${config.MODE})`
	);
});
