"use strict";

const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("btn");
const log_out = document.getElementById("btn_logout");
const refresh = document.getElementById("refresh");
const error_box = document.getElementById("error_box");
const message_box = document.getElementById("messages");

function logOut() {
	localStorage.clear();
}
log_out.onclick = logOut;

const fetchGeneral = async () => {
	message_box.innerHTML = "";
	const read_userID = localStorage.getItem("userID");
	const res = await fetch("/api/messages", {
		method: "POST",
		body: JSON.stringify({
			username: username.value,
			password: password.value,
			userId: read_userID,
		}),
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});
	// if response is not ok
	if (!res.ok) {
		console.error("Error from fetchFormData, res is not ok: ", res);
		error_box.textContent = "Something went wrong, please try again";
		return;
	}
	// if res is ok then do the following

	const data = await res.json();
	if (data.message) {
		error_box.textContent = ` ${data.message}`;
		return;
	} else {
		if (read_userID === undefined || read_userID === null) {
			localStorage.setItem("userID", data.userId);
		}
		error_box.textContent = "";
		for (let i = 0; i < data.emails.length; i++) {
			const container = document.createElement("section");
			const email_subject = document.createElement("div");
			email_subject.className = "sub";
			email_subject.title = "Subject of the Email";
			const email = document.createElement("div");
			email.className = "email";
			email.title = "User Email";
			const email_content = document.createElement("textarea");
			email_content.className = "content";
			email_subject.textContent = data.emails[i].subject;
			email.textContent = data.emails[i].email;
			email_content.textContent = data.emails[i].message;
			container.appendChild(email);
			container.appendChild(email_subject);
			container.appendChild(email_content);
			message_box.appendChild(container);
		}
	}
	username.value = "";
	password.value = "";
};

submit.onclick = fetchGeneral;
refresh.onclick = fetchGeneral;
