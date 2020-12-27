"use strict";
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
