"use strict";

const feedbackCont = document.getElementById("error-feedback");
const userE = document.getElementById("userEmail");
const subscribeButton = document.getElementById("subscribe");
const EMFContainer = document.querySelector(".EMF-container");

const subscribeFunction = async () => {
	const res = await fetch("/api/subscribedList", {
		method: "POST",
		body: JSON.stringify({
			userEmail: userE.value,
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
	feedbackCont.textContent = `${data.message}`;
	userE.value = "";
};

subscribeButton.onclick = subscribeFunction;
userE.onkeyup = function (event) {
	if (event.keyCode === 13) {
		subscribeFunction();
	}
};
