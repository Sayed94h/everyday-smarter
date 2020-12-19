"use strict";

const questionOne = document.getElementById("questionOne");
const questionTow = document.getElementById("questionTwo");
const questionThree = document.getElementById("questionThree");
const questionFour = document.getElementById("questionFour");
const questionFive = document.getElementById("questionFive");
const questionSix = document.getElementById("questionSix");
const questionSeven = document.getElementById("questionSeven");
const questionEight = document.getElementById("questionEight");
const submitFeedback = document.getElementById("submit");
const feedbackHeader = document.getElementById("feedback-header");

const fetchFormData = async () => {
	const res = await fetch("/api/feedbackForm", {
		method: "POST",
		body: JSON.stringify({
			questionOne: questionOne.value,
			questionTow: questionTow.value,
			questionThree: questionThree.value,
			questionFour: questionFour.value,
			questionFive: questionFive.value,
			questionSix: questionSix.value,
			questionSeven: questionSeven.value,
			questionEight: questionEight.value,
		}),
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});
	// if response is not ok
	if (!res.ok) {
		console.error("Error from fetchFeedbackData, res is not ok: ", res);
		let responseToFeedback = document.createElement("p");
		responseToFeedback.id = "response";
		responseToFeedback.textContent = "Something went wrong, please try again";
		feedbackHeader.appendChild(responseToFeedback);
		return;
	}
	// if res is ok then do the following

	const data = await res.json();
	let responseToFeedback = document.createElement("p");
	responseToFeedback.id = "response";
	responseToFeedback.textContent = ` ${data.message}`;

	feedbackHeader.appendChild(responseToFeedback);
	questionOne.value = "";
	questionTow.value = "";
	questionThree.value = "";
	questionFour.value = "";
	questionFive.value = "";
	questionSix.value = "";
	questionSeven.value = "";
	questionEight.value = "";
};

submitFeedback.onclick = fetchFormData;
