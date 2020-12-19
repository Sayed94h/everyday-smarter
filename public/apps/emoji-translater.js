"use strict";

const textInput = document.getElementById("text-input");
const displayContainer = document.getElementById("emoji-container");
displayContainer.textContent = "  Emojis come here...";
async function sendFetch() {
	let text = textInput.value;
	displayContainer.textContent = "  Loading...";
	const res = await fetch("/api/text-to-emoji", {
		method: "POST",
		body: JSON.stringify({
			text: text,
		}),
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});
	// if there is any error
	if (!res.ok) {
		console.error("Error from sending text and fetching res: ", res);
		displayContainer.textContent = "Something went wrong, please try again.";
	}

	// if no error
	displayContainer.textContent = "  Loading...";
	const data = await res.json();
	if (data.emojis === "") {
		displayContainer.textContent = "  Loading...";
	}
	displayContainer.textContent = `${data.emojis}`;
}

textInput.onkeyup = sendFetch;
