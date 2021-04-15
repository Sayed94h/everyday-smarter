"use strict";

const express = require("express");
const path = require("path");
const logger = require("./logger");
const config = require("./config");
const cors = require("cors");
const api = require("./api");
const app = express();
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/home", express.static(path.join(__dirname, "public")));
app.use(
	"/projects",
	express.static(path.join(__dirname, "public/projects.html"))
);
app.use(
	"/services",
	express.static(path.join(__dirname, "public/services.html"))
);
app.use("/about", express.static(path.join(__dirname, "public/about.html")));
app.use(
	"/contacts",
	express.static(path.join(__dirname, "public/contacts.html"))
);
app.use(
	"/feedback",
	express.static(path.join(__dirname, "public/feedback.html"))
);
app.use(
	"/repositories",
	express.static(path.join(__dirname, "public/repositories.html"))
);
app.use(
	"/messages_page",
	express.static(path.join(__dirname, "public/messages_page.html"))
);
// in case if there is any error
app.use(function (err, req, res, next) {
	if (err) {
		console.error(err.stack);
		res.status(500).end();
		return;
	}
	next();
});
app.use("/api", api);
// open the server
app.listen(config.PORT, (err) => {
	if (err) {
		console.error("Error from creating server: ", err);
		return;
	}
	console.log(
		`Listening to http://localhost:${config.PORT} (MODE: ${config.MODE})`
	);
});
