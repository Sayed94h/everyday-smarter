const translate = require("moji-translate");
const path = require("path");
const fs = require("fs");
const { response } = require("express"); // why I added this line?????
const messagesPath = path.join(__dirname, "..", "/data/messages.json");
const subscribedListPath = path.join(
	__dirname,
	"..",
	"/data/subscribed-users.json"
);
const feedbackPath = path.join(__dirname, "..", "/data/feedback.json");
const registrationsPath = path.join(
	__dirname,
	"..",
	"/data/registrations.json"
);
const babyboyNamesPath = path.join(__dirname, "..", "/data/babyboysname.json");
const babygirlNamesPath = path.join(
	__dirname,
	"..",
	"/data/babygirlsname.json"
);
const handlers = {
	translateText: (req, res, next) => {
		const text = req.body.text;
		if (text === "") {
			res.json({
				emojis: "Please write some text in the text input 👈👈",
			});
			return;
		}
		res.json({
			emojis: translate.translate(text),
		});
	},
	contactForm: async (req, res, next) => {
		const formData = req.body;
		if (formData.message === "") {
			res.json({
				message: "Please write your message",
			});
			return;
		}
		let readDatabase = await fs.readFile(messagesPath, "UTF-8", (err, data) => {
			if (err) {
				console.error("Error from reading database, contactForm: ", err);
				res.json({
					message:
						"Something went wrong. We will fix this problem. Please try again!",
				});
				return;
			}
			let parsedData = JSON.parse(data);
			// data to push
			formData.id = parsedData.nextId;
			// push the new message
			parsedData.messages.push(formData);
			// increase the ID
			parsedData.nextId++;
			// save changes
			let toWrite = JSON.stringify(parsedData, null, " ");
			let writeToDatabase = fs.writeFile(messagesPath, toWrite, (err) => {
				if (err) {
					console.error(
						"Error from writing to messages.json, contactForm: ",
						err
					);
					res.json({
						message:
							"Dear visitor, we are sorry for what happened.\nWe fix this problem.Please try again",
					});
					return;
				}
				res.json({
					message:
						"Thank you for your feedback/message. We appreciate your time. Have great times!",
				});
			});
		});
	},
	getMessages: async (req, res, next) => {
		const formData = req.body;
		if (formData.userId === undefined || formData.userId === null) {
			if (formData.username === "" || formData.password === "") {
				res.json({
					message: "Please Enter Your Credentials to log in!",
				});
				return;
			}
			if (
				formData.username !== "sunnyDay" ||
				formData.password !== "readyToRead+9"
			) {
				res.json({
					message: "Your Credentials are not correct!",
				});
				return;
			}
		}
		let readDatabase = await fs.readFile(messagesPath, "UTF-8", (err, data) => {
			if (err) {
				console.error("Error from reading database, contactForm: ", err);
				res.json({
					message:
						"Something went wrong. We will fix this problem. Please try again!",
				});
				return;
			}
			let parsedData = JSON.parse(data);
			// data to send

			res.json({
				emails: parsedData.messages,
				userId: 578,
			});
		});
	},
	feedbackForm: async (req, res, next) => {
		const feedbackData = req.body;
		if (
			feedbackData.questionOne === "" ||
			feedbackData.questionTwo === "" ||
			feedbackData.questionThree === "" ||
			feedbackData.questionFour === "" ||
			feedbackData.questionFive === "" ||
			feedbackData.questionSix === "" ||
			feedbackData.questionSeven === "" ||
			feedbackData.questionEight === ""
		) {
			res.json({
				message: "Please answer to questions, Thank you for your time!",
			});
			return;
		}
		let readDatabase = await fs.readFile(feedbackPath, "UTF-8", (err, data) => {
			if (err) {
				console.error("Error from reading database, feedbackForm: ", err);
				res.json({
					message:
						"Something went wrong, please try again!\nWe will fix this problem",
				});
				return;
			}
			let parsedData = JSON.parse(data);
			// data to push
			feedbackData.id = parsedData.nextId;
			// push the new message
			parsedData.feedbacks.push(feedbackData);
			// increase the ID
			parsedData.nextId++;
			// save changes
			let toWrite = JSON.stringify(parsedData, null, " ");
			let writeToDatabase = fs.writeFile(feedbackPath, toWrite, (err) => {
				if (err) {
					console.error(
						"Error from writing to feedback.json, feedbackForm: ",
						err
					);
					res.json({
						message:
							"Dear visitor, we are sorry for what happened.\nWe fix this problem.Please try again",
					});
					return;
				}
				res.json({
					message:
						"Thank you for your feedback. We appreciate your time. Have great times!",
				});
			});
		});
	},
	subscribedList: async (req, res, next) => {
		const userInter = req.body;
		if (userInter.userEmail === "" || !userInter.userEmail.includes("@")) {
			res.json({
				message: "Please enter a real email address!",
			});
			return;
		}
		let readDatabase = await fs.readFile(
			subscribedListPath,
			"UTF-8",
			(err, data) => {
				if (err) {
					console.error("Error from subscribedList read file: ", err);
					return;
				} // if no error at reading database
				let parsedData = JSON.parse(data);
				userInter.id = parsedData.nextId;
				parsedData.subscribedUsers.push(userInter);
				parsedData.nextId++;
				let toWrite = JSON.stringify(parsedData, null, " ");
				let saveChanges = fs.writeFile(subscribedListPath, toWrite, (err) => {
					if (err) {
						console.error("Error from subscribedList write file: ", err);
						res.send({
							message:
								"We are sorry. We could not add you to subscription list. Please try again!",
						});
						return;
					}
					res.json({
						message: "You are now in our list. We keep you up to date!",
					});
				});
			}
		);
	},
	getBabyNames: async (req, res, next) => {
		let girlBoy = req.params.name;
		let sortList = req.query.sort;
		// console.log("girlBoy general: ", girlBoy);
		// set the path to the asked name list by users
		let setDataPath = "";
		if (girlBoy === "girl") {
			setDataPath = babygirlNamesPath;
		}
		if (girlBoy === "boy") {
			setDataPath = babyboyNamesPath;
		}
		// read the name list
		let readJson = await fs.readFile(setDataPath, "UTF-8", (err, data) => {
			if (err) {
				console.error("Error from reading file get babynames: ", err);
				res.send(`Something went wrong please try again`);
			}
			let parsedData = JSON.parse(data);
			if (sortList === "ASC" || sortList === "DESC") {
				let onlyNames = [];
				parsedData.names.forEach(function (a, b) {
					onlyNames.push(a.name);
				});
				if (sortList === "ASC") {
					res.send(onlyNames.sort());
					return;
				}
				if (sortList === "DESC") {
					res.send(onlyNames.sort().reverse());
					return;
				}
				return;
			}
			res.send(parsedData.names);
		});
	},
	getBabyNamesById: async (req, res, next) => {
		let girlBoy = req.params.name;
		let nameId = Number(req.params.id);
		console.log("girlBoy id: ", girlBoy);
		// if (girlBoy !== "boy" || girlBoy !== "girl") {
		// 	console.log("From logic Id");
		// 	res.send(`How to use this API?<br>1. Get all 1000 names of baby boy:<br>
		//  https://everydaysmarter.herokuapp.com/api/babyNames/boy
		//  <br>2. Get all 1000 names of baby girl:<br> https://everydaysmarter.herokuapp.com/api/babyNames/girl
		//  <br>3. Get one name of baby girl by Id:<br>
		//  https://everydaysmarter.herokuapp.com/api/babyNames/girl/a number(1-1000)
		//  <br>4. Get one name of baby boy by Id:<br>
		//  https://everydaysmarter.herokuapp.com/api/babyNames/boy/a number(1-1000)
		//  <br>5. Get all 1000 names of baby girl and sort them ascending:<br>
		//  https://everydaysmarter.herokuapp.com/api/babyNames/girl?sort=ASC
		//  <br>6. Get all 1000 names of baby boy and sort them ascending :<br>
		//  https://everydaysmarter.herokuapp.com/api/babyNames/boy?sort=ASC
		//  <br>7. Get all 1000 names of baby girl and sort them descending:<br>
		//  https://everydaysmarter.herokuapp.com/api/babyNames/girl?sort=DESC
		//  <br>8. Get all 1000 names of baby boy and sort them descending:<br>
		//  https://everydaysmarter.herokuapp.com/api/babyNames/boy?sort=DESC`);
		// 	return;
		// }
		// set the path to the asked name list by users
		let setDataPath = "";
		if (girlBoy === "girl") {
			setDataPath = babygirlNamesPath;
		}
		if (girlBoy === "boy") {
			setDataPath = babyboyNamesPath;
		}
		// read the name list
		let readJson = await fs.readFile(setDataPath, "UTF-8", (err, data) => {
			if (err) {
				console.error("Error from reading file getbabynames: ", err);
				res.send(`Something went wrong please try again`);
			}
			let parsedData = JSON.parse(data);
			// send the name with the asked ID by users
			if (nameId !== "") {
				let toSendName = parsedData.names.filter((name) => name.id === nameId);
				res.send(toSendName);
				return;
			}
			res.send(parsedData.names);
		});
	},
};

module.exports = handlers;
