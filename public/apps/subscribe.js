"use strict";

const feedbackContainer = document.getElementById("error-feedback");
const userEmail = document.getElementById("userEmail");
const subscribeButton = document.getElementById("subscribe");
const EMFContainer = document.querySelector(".EMF-container");

const subscribeFunction = async () => {
	const res = await fetch("/api/subscribedList", {
		method: "POST",
		body: JSON.stringify({
			userEmail: userEmail.value,
		}),
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});
	// if error
	if (!res.ok && res.status !== 200) {
		console.error("Error from subscribeFunction: ", res);
		return;
	}
	// if no error

	const data = await res.json();
	EMFContainer.style =
		"border-top: 2px green solid;" +
		"padding: 7px 0px;" +
		"text-align: center;" +
		"font-weight: bold;" +
		"color: red;";
	feedbackContainer.textContent = `${data.message}`;
	userEmail.value = "";
};

subscribeButton.onclick = subscribeFunction;
userEmail.onkeyup = function (event) {
	if (event.keyCode === 13) {
		subscribeFunction();
	}
};
