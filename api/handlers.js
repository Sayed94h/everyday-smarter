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
const interactionsPath = path.join(
	__dirname,
	"..",
	"/data/interactions-interestings.json"
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

			res.json(parsedData.messages);
		});
	},
	feedbackForm: async (req, res, next) => {
		const feedbackData = req.body;
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
	registrations: async (req, res, next) => {
		let formData = req.body;
		let newDate = new Date();
		let dateToString = newDate.toString();
		let dateToArray = dateToString.split(" ");
		let day = dateToArray[2];
		let month = dateToArray[1];
		let year = newDate.getFullYear();
		let msecond = newDate.getMilliseconds();
		let timeZone = dateToArray[5];
		let hour = dateToArray[4];
		let registrationDate = `${day}-${month}-${year} ${hour}:${msecond}  ${timeZone}`;
		// console.log("FromData: ", formData);
		// check the gender and set the correct users gender
		let gender = "";
		if (formData.customGender === "") {
			gender = formData.gender;
		} else {
			gender = formData.customGender;
		}
		let readDatabase = await fs.readFile(
			registrationsPath,
			"UTF-8",
			(err, data) => {
				if (err) {
					console.error("Error from registrations: ", err);
					res.json({
						message: "Something went wrong, please try again!",
					});
					return;
				}
				// if no error at reading database
				let parsedData = JSON.parse(data);
				// newUser
				let newUser = {
					id: parsedData.nextId,
					Firstname: formData.Firstname,
					Lastname: formData.Lastname,
					Email: formData.Email,
					Password: formData.Password,
					birth_month: formData.birth_month,
					birth_day: formData.birth_day,
					birth_year: formData.birth_year,
					registrationDate: registrationDate,
					gender: gender,
					loggedin: false,
				};
				// increase the nextId by one
				parsedData.nextId++;
				// push the new user to database
				parsedData.users.push(newUser);
				let toWrite = JSON.stringify(parsedData, null, " ");
				let saveChanges = fs.writeFile(registrationsPath, toWrite, (err) => {
					if (err) {
						console.error("Error from registrations, writing file : ", err);
						res.json({
							message: `Dear ${formData.Firstname}, we could not register you for now, please try again.`,
						});
						return;
					}
					// if no error at registering user
					res.json({
						message: "Success",
					});
				});
			}
		);
	},
	redirectAfterRegistration: async (req, res, next) => {
		let fileToSend = path.join(__dirname, "..", "/public/login.html");
		// console.log("fileToSend: ", fileToSend);
		await res.sendFile(fileToSend);
	},
	login: async (req, res, next) => {
		let formData = req.body;
		let readDatabase = await fs.readFile(
			registrationsPath,
			"UTF-8",
			(err, data) => {
				if (err) {
					console.error("Error from login: ", err);
					res.json({
						message: "Something went wrong, please try again!",
					});
				}
				// if no error at reading database
				let parsedData = JSON.parse(data);
				let exactUser = parsedData.users.filter(
					(user) =>
						user.Email === formData.username &&
						user.Password === formData.password
				);
				if (exactUser.length < 1) {
					res.json({
						message:
							"Dear visitor, your Email address, Phone number or Password does not match. Please try again",
					});
					return;
				}
				exactUser.loggedin = true;
				res.json({
					message: "Success",
				});
			}
		);
	},
	getUserProfile: async (req, res, next) => {
		let username = req.params.name;
		let password = req.params.password;
		let readDatabase = await fs.readFile(
			registrationsPath,
			"UTF-8",
			(err, data) => {
				if (err) {
					console.error("Error from getUserProfile: ", err);
					res.json({
						message: "Something went wrong, please try again!",
					});
					return;
				}
				// if no error at reading database
				let parsedData = JSON.parse(data);
				let exactUser = parsedData.users.filter(
					(user) =>
						user.loggedin === true &&
						user.Email === username &&
						user.Password === password
				);
				console.log("exactUser: ", exactUser);
				res.json({
					firstname: exactUser[0].Firstname,
					lastname: exactUser[0].Lastname,
				});
			}
		);
	},
	getInteractions: async (req, res, next) => {
		let varName = req.params.name;
		let readDatabase = await fs.readFile(
			interactionsPath,
			"UTF-8",
			(err, data) => {
				if (err) {
					console.error("Error from getInteractions: ", err);
					res.json({
						message: "Error reading database to send to client",
					});
					return;
				}
				// if no error at reading database
				let parsedData = JSON.parse(data);
				res.json({
					varToSet: varName,
					varValue: parsedData.interactions[`${varName}`],
				});
			}
		);
		return;
	},
	getInteractionsOnload: async (req, res, next) => {
		let readDatabase = await fs.readFile(
			interactionsPath,
			"UTF-8",
			(err, data) => {
				if (err) {
					console.error("Error from getInteractionsOnload: ", err);
					res.json({
						message: "Error reading database to send to client",
					});
					return;
				}
				// if no error at reading database
				let parsedData = JSON.parse(data);
				res.json(parsedData.interactions);
			}
		);
		return;
	},
	updateInteractions: async (req, res, next) => {
		const userInter = req.body;
		// console.log("userInter: ", userInter);
		let keys = Object.keys(userInter);
		// console.log("keys: ", keys);

		let readDatabase = await fs.readFile(
			interactionsPath,
			"UTF-8",
			(err, data) => {
				if (err) {
					console.error("Error from updateInteractions: ", err);
					res.json({
						message: "Error reading database to update",
					});
					return;
				} // if no error at reading database
				let parsedData = JSON.parse(data);
				parsedData.interactions[keys[0]] = userInter[keys[0]];
				let toWrite = JSON.stringify(parsedData, null, "  ");
				let saveChanges = fs.writeFile(interactionsPath, toWrite, (err) => {
					if (err) {
						console.error("Error from updateInteractions: ", err);
						response.send({
							message: "could not save data!",
						});
						return;
					}
					res.json({
						message: "success",
					});
				});
			}
		);
		return;
	},
	subscribedList: async (req, res, next) => {
		const userInter = req.body;
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
								"We are sorry. We could not add you to subscribtion list. Please try again!",
						});
						return;
					}
					res.json({
						message: "You are now in our list. Thank you for your trust!",
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
				console.error("Error from readingfile getbabynames: ", err);
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
				console.error("Error from readingfile getbabynames: ", err);
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
