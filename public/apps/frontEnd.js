"use strict";
import Math_Game from "./math-game.js";
const asideWrapper = document.getElementById("aside-wrapper");
const mainAside = document.querySelector(".main-aside");
const menu = document.getElementById("menu");
const welcomeParagraph = document.getElementById("welcome-paragraph");
const closeMenu = document.getElementById("close-menu");
/* 
	for displaying and non-displaying the elements
*/
let displaying = false;
function toggleDisplay(getElement) {
	displaying = !displaying;
	if (displaying) {
		getElement.style.display = "flex";
	} else {
		getElement.style.display = "none";
	}
}
menu.addEventListener("click", function () {
	asideWrapper.style.display = "initial";
});
// close the menu
closeMenu.onclick = function () {
	asideWrapper.style.display = "none";
};
/* 
	for welcome paragraph
*/
let left = 90;
function moveParagraph() {
	left = left - 0.15;
	welcomeParagraph.style.left = `${left}vw`;
	if (left < -90) {
		left = 90;
	}
}
setInterval(moveParagraph, 15);

// for the showcase

const threedSection = document.querySelector("section.transform-3d");
let optionsArray = [
	"rotate(360deg)",
	"rotateX(360deg)",
	"rotateY(360deg)",
	"rotateZ(360deg)",
	"rotate3d(1, 1, 1, 90deg)",
	"scale(1.5)",
	"scaleX(1.5)",
	"scaleY(1.5)",
	"scaleZ(1.5)",
	"scale3d(1, 1.5, 1.5)",
	"skew(17deg, 13deg)",
	"skewX(17deg)",
	"skewY(17deg)",
	"translate(50px, 50px)",
	"translateX(50px)",
	"translateY(50px)",
	"translateZ(50px)",
	"translate3d(50px, 50px, 50px)",
	"perspective(100px)",
	"matrix(1, 2, -1, 1, 50, 50)",
	"matrix3d(1,0,0,0,0,1,3,0,0,0,1,0,50,50,0,1.1)",
];

let i = 0;
function changeStyle() {
	threedSection.style.transform = `rotate3d(1, 1, 1, 30deg) ${optionsArray[i]}`;
	i++;
	if (i > optionsArray.length) {
		i = 0;
	}
}
setInterval(changeStyle, 1000);
// for the second 3D animation
const threedSectionTwo = document.querySelector("section.transform-3d2");
let optionsArrayTwo = [
	"rotateX(90deg)",
	"rotateX(180deg)",
	"rotateX(270deg)",
	"rotateX(360deg)",
	"rotateY(90deg)",
	"rotateY(270deg)",
	"rotateY(90deg)",
	"rotateY(360deg)",
	"rotateZ(90deg)",
	"rotateZ(180deg)",
	"rotateZ(270deg)",
	"rotateZ(360deg)",
];

let j = 0;
function changeStyleTwo() {
	threedSectionTwo.style.transform = `rotate3d(1, 1, 1, 30deg) ${optionsArrayTwo[j]}`;
	j++;
	if (j > optionsArrayTwo.length) {
		j = 0;
	}
}
setInterval(changeStyleTwo, 1200);

// for keycodes
const keyText = document.getElementById("key-input");
const keyContainer = document.getElementById("keycode-container");
function keyCodeFinder(event) {
	keyContainer.textContent += `  ${event.keyCode}`;
}
keyText.onkeyup = keyCodeFinder;

// for binary to decimal
const binaryInput = document.getElementById("binary-input");
const decimalContainer = document.getElementById("decimal-container");
function binaryConverter(event) {
	let binNum = event.target.value;
	// in case users enter other numbers than 0 and 1 then display a custom alert box
	if (binNum.match(/[2-9]+/)) {
		const wrapper = document.createElement("div");
		wrapper.className = "alert-wrapper";
		const container = document.createElement("div");
		container.className = "alert-container";
		const message = document.createElement("p");
		const confirmButton = document.createElement("button");
		message.textContent =
			"Please enter only the digits 1(one) and 0(zero) because it's binary!";
		confirmButton.textContent = "OK";
		document.body.appendChild(wrapper);
		wrapper.appendChild(container);
		container.appendChild(message);
		container.appendChild(confirmButton);
		confirmButton.onclick = function () {
			binaryInput.value = "";
			decimalContainer.value = "";
			wrapper.style.display = "none";
		};
	} else {
		let inputArray = binNum.split("");
		let powerOf = inputArray.length;
		let decimalNum = 0;
		for (let i = 0; i < powerOf; i++) {
			let eachBinary = Number(inputArray[i]);
			decimalNum += eachBinary * Math.pow(2, powerOf - (i + 1));
		}
		decimalContainer.value = ` ${decimalNum}`;
	}
}
binaryInput.onkeyup = binaryConverter;

// for decimal to binary

const decimalInput = document.getElementById("decimal-input");
const binaryContainer = document.getElementById("binary-container");

function decimalToBinary(event) {
	debugger;
	binaryContainer.value = "";
	const userInput = event.target.value;
	let userInputToNumber = Number(userInput);
	let convertedDecimalToBinary = "";
	while (userInputToNumber > 0) {
		let checking = Math.floor(userInputToNumber % 2);

		if (checking === 0) {
			convertedDecimalToBinary = "0" + convertedDecimalToBinary;
		} else {
			convertedDecimalToBinary = "1" + convertedDecimalToBinary;
		}
		userInputToNumber = Math.floor(userInputToNumber / 2);
	}
	if (convertedDecimalToBinary.split("").length % 2 > 0) {
		convertedDecimalToBinary = "0" + convertedDecimalToBinary;
	}
	binaryContainer.value = ` ${convertedDecimalToBinary}`;
}

decimalInput.onkeyup = decimalToBinary;
