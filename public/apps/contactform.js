"use strict";

const visitorName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
const response = document.getElementById("response");
const fetchFormData = async () => {
	const res = await fetch("/api/contactForm", {
		method: "POST",
		body: JSON.stringify({
			name: visitorName.value,
			email: email.value,
			subject: subject.value,
			message: message.value,
		}),
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});
	// if response is not ok
	if (!res.ok) {
		console.error("Error from fetchFormData, res is not ok: ", res);
		response.textContent = "Something went wrong, please try again";
		return;
	}
	// if res is ok then do the following

	const data = await res.json();
	response.textContent = ` ${data.message}`;
	visitorName.value = "";
	email.value = "";
	subject.value = "";
	message.value = "";
};

submit.onclick = fetchFormData;
