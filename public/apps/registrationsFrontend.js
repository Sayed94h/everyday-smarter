"use strict";

const firstName = document.getElementById("Firstname");
const lastName = document.getElementById("Lastname");
const userEmail = document.getElementById("Email");
const userPass = document.getElementById("Password");
const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");
const gender = document.getElementById("male-female");
const female = document.getElementById("female");
const customGender = document.getElementById("custom-gender");
const submitButton = document.getElementById("signup");
const feedbackContainer = document.getElementById("feedback-container");

const sendFormData = async () => {
	const res = await fetch(`/api/registrations`, {
		method: "POST",
		body: JSON.stringify({
			Firstname: firstName.value,
			Lastname: lastName.value,
			Email: userEmail.value,
			Password: userPass.value,
			birth_month: month.value,
			birth_day: day.value,
			birth_year: year.value,
			gender: gender.value,
			customGender: customGender.value,
		}),
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});

	if (!res.ok) {
		console.error("Error from sendFormData: ", res);
		feedbackContainer.textContent = "Something went wrong, please try again!";
	}
	// no error

	const data = await res.json();
	feedbackContainer.textContent = `${data.message}`;
};

submitButton.onclick = sendFormData;

gender.onchange = function (event) {
	if (event.keyCode === 13) {
		sendFormData();
	}
};
