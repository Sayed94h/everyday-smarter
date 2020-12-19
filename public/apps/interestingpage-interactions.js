"use strict";

const interactionContainerOne = document.querySelector(".interactionOne");
const interactionContainerTwo = document.querySelector(".interactionTwo");
const interactionContainerThree = document.querySelector(".interactionThree");
const interactionContainerFour = document.querySelector(".interactionFour");
const videoOne = document.querySelector(".videoOne");
const c1 = document.querySelector(".c1");
const c2 = document.querySelector(".c2");
const c3 = document.querySelector(".c3");
const c4 = document.querySelector(".c4");
const c5 = document.querySelector(".c5");
const c6 = document.querySelector(".c6");
const c7 = document.querySelector(".c7");
const c8 = document.querySelector(".c8");
const c9 = document.querySelector(".c9");
const c10 = document.querySelector(".c10");
const c11 = document.querySelector(".c11");
const c12 = document.querySelector(".c12");
const c13 = document.querySelector(".c13");

// console.log(interactionContainer.firstElementChild);
// container one
// for the first post
let love = 0;
let like = 0;
let dislike = 0;
// for the second post
let loveTwo = 0;
let likeTwo = 0;
let dislikeTwo = 0;
// for the third post
let loveThree = 0;
let likeThree = 0;
let dislikeThree = 0;
// for the fourth post
let love4 = 0;
let like4 = 0;
let dislike4 = 0;
// for videos
let videoOne_views = 0;
// let interactionObj = {

// }
// on page load
async function getInteractionsOnload() {
	const res = await fetch(`/api/interactionsOnload`);
	if (!res.ok) {
		console.error("Error from getInteractions: ", res);
		return;
	}
	const data = await res.json();
	love = data.love;
	like = data.like;
	dislike = data.dislike;
	loveTwo = data.loveTwo;
	likeTwo = data.likeTwo;
	dislikeTwo = data.dislikeTwo;
	loveThree = data.loveThree;
	likeThree = data.likeThree;
	dislikeThree = data.dislikeThree;
	love4 = data.love4;
	like4 = data.like4;
	dislike4 = data.dislike4;
	videoOne_views = data.videoOne_views;
	c1.textContent = `${love}`;
	c2.textContent = `${like}`;
	c3.textContent = `${dislike}`;
	c4.textContent = `${loveTwo}`;
	c5.textContent = `${likeTwo}`;
	c6.textContent = `${dislikeTwo}`;
	c7.textContent = `${loveThree}`;
	c8.textContent = `${likeThree}`;
	c9.textContent = `${dislikeThree}`;
	c10.textContent = `${videoOne_views}`;
	c11.textContent = `${love4}`;
	c12.textContent = `${like4}`;
	c13.textContent = `${dislike4}`;
}
getInteractionsOnload();
// on update
async function getInteractions() {
	const res = await fetch(`/api/interactions`);
	if (!res.ok) {
		console.error("Error from getInteractions: ", res);
		return;
	}
	const data = await res.json();
	love = data.love;
	like = data.like;
	dislike = data.dislike;
	loveTwo = data.loveTwo;
	likeTwo = data.likeTwo;
	dislikeTwo = data.dislikeTwo;
	loveThree = data.loveThree;
	likeThree = data.likeThree;
	dislikeThree = data.dislikeThree;
	love4 = data.love4;
	like4 = data.like4;
	dislike4 = data.dislike4;
	videoOne_views = data.videoOne_views;
}

const updateInteractions = async (variable, score) => {
	const res = await fetch(`/api/interactions`, {
		method: "POST",
		body: JSON.stringify({
			[variable]: score,
		}),
		headers: {
			"content-type": "application/json; charset=UTF-8",
		},
	});
	if (!res.ok && res.status !== 200) {
		console.error("error form updateInteractions: ", res);
		return;
	}
	// const data = await res.json();
	// console.log("data update: ", data);
};

function clickHandlerOne(event) {
	let firsEl = event.target.parentElement.firstElementChild;
	// let lastEl = event.target.parentElement.lastElementChild;
	// console.log(event.target.className);
	if (event.target.className === "material-icons red") {
		getInteractions();
		let score = love + 1;
		updateInteractions("love", score);
		firsEl.textContent = `${score}`;
	}
	if (event.target.className === "material-icons blue") {
		getInteractions();
		let score = like + 1;
		updateInteractions("like", score);
		firsEl.textContent = `${score}`;
	}
	if (event.target.className === "material-icons black") {
		getInteractions();
		let score = dislike + 1;
		updateInteractions("dislike", score);
		firsEl.textContent = `${score}`;
	}
}

function clickHandlerTwo(event) {
	let firsEl = event.target.parentElement.firstElementChild;
	// let lastEl = event.target.parentElement.lastElementChild;
	// console.log(event.target.className);
	if (event.target.className === "material-icons red") {
		getInteractions();
		let score = loveTwo + 1;
		updateInteractions("loveTwo", score);
		firsEl.textContent = `${score}`;
	}

	if (event.target.className === "material-icons blue") {
		getInteractions();
		let score = likeTwo + 1;
		updateInteractions("likeTwo", score);
		firsEl.textContent = `${score}`;
	}
	if (event.target.className === "material-icons black") {
		getInteractions();
		let score = dislikeTwo + 1;
		updateInteractions("dislikeTwo", score);
		firsEl.textContent = `${score}`;
	}
}

function clickHandlerThree(event) {
	let firsEl = event.target.parentElement.firstElementChild;
	// let lastEl = event.target.parentElement.lastElementChild;
	// console.log(event.target.className);
	if (event.target.className === "material-icons red") {
		getInteractions();
		let score = loveThree + 1;
		updateInteractions("loveThree", score);
		firsEl.textContent = `${score}`;
	}

	if (event.target.className === "material-icons blue") {
		getInteractions();
		let score = likeThree + 1;
		updateInteractions("likeThree", score);
		firsEl.textContent = `${score}`;
	}
	if (event.target.className === "material-icons black") {
		getInteractions();
		let score = dislikeThree + 1;
		updateInteractions("dislikeThree", score);
		firsEl.textContent = `${score}`;
	}
}

function clickHandler4(event) {
	let firsEl = event.target.parentElement.firstElementChild;
	// let lastEl = event.target.parentElement.lastElementChild;
	// console.log(event.target.className);
	if (event.target.className === "material-icons red") {
		getInteractions();
		let score = love4 + 1;
		updateInteractions("love4", score);
		firsEl.textContent = `${score}`;
	}

	if (event.target.className === "material-icons blue") {
		getInteractions();
		let score = like4 + 1;
		updateInteractions("like4", score);
		firsEl.textContent = `${score}`;
	}
	if (event.target.className === "material-icons black") {
		getInteractions();
		let score = dislike4 + 1;
		updateInteractions("dislike4", score);
		firsEl.textContent = `${score}`;
	}
}

interactionContainerOne.onclick = clickHandlerOne;
interactionContainerTwo.onclick = clickHandlerTwo;
interactionContainerThree.onclick = clickHandlerThree;
interactionContainerFour.onclick = clickHandler4;

videoOne.onclick = function () {
	getInteractions();
	let score = videoOne_views + 1;
	updateInteractions("videoOne_views", score);
	document.querySelector(".videoOneView").textContent = `${score}`;
};
