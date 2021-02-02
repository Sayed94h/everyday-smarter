"use strict";
const username = document.getElementById("username");
const userPass = document.getElementById("password");
const submitButton = document.getElementById("submitButon");
const feedbackContainer = document.getElementById("feedback-errors");
const loginProfileName = document.getElementById("login-profile-name");

// Shared object across all pages
export let userProfile = {};

const sendLoginCredential = async () => {
	const res = await fetch(`/api/login`, {
		method: "POST",
		body: JSON.stringify({
			username: username.value,
			password: userPass.value,
		}),
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});

	if (!res.ok) {
		console.error("Error from sendLoginCredential: ", res);
		feedbackContainer.textContent = "Something went wrong, please try again!";
		return;
	}
	// no error

	const data = await res.json();
	feedbackContainer.textContent = `${data.message}`;
	if (data.message === "Success") {
		console.log("check it out: ", data.message);
		getUsersName(username.value, userPass.value);
	}
};

// get the user Firstname to show he/she is logged in
const getUsersName = async (username, password) => {
	const res = await fetch(`/api/login/${username}/${password}`);
	if (!res.ok) {
		console.error("Error from getUsersName: ", res);
		feedbackContainer.textContent = "Something went wrong, please try again!";
		return;
	}
	// no error

	const data = await res.json();
	loginProfileName.textContent = `${data.firstname}`;
	userProfile.firstname = data.firstname;
	userProfile.lastname = data.lastname;
};

submitButton.onclick = sendLoginCredential;

userPass.onkeyup = function (event) {
	if (event.keyCode === 13) {
		sendLoginCredential();
	}
};
