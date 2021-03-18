"use strict";

const visitorName = document.getElementById("name");
// const pic = document.getElementById("img");
// const testing = document.getElementById("testing");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
const response = document.getElementById("response");
// const ppicture = [];
// pic.onchange = function (eve) {
// 	testing.src = window.URL.createObjectURL(pic.files[0]);
// 	const blob = new Blob([pic.files[0]], { type: "image/*" });
// 	// get arrayBuffer from blob
// 	let fileReader = new FileReader();

// 	fileReader.readAsArrayBuffer(blob);

// 	fileReader.onload = function (event) {
// 		let arrayBuffer = fileReader.result;
// 		ppicture.push(arrayBuffer);
// 		console.log("arrBuffer: ", arrayBuffer);
// 	};

// 	ppic: ppicture[0]
// };
const fetchFormData = async () => {
	console.log("bufferedArray: ", ppicture);
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
	// delete the internal blob reference, to let the browser clear memory from it
	// URL.revokeObjectURL(testing.src);
};

submit.onclick = fetchFormData;
