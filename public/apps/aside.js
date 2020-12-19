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
let p_width = 0;
let margin_left = 70;
//welcomeParagraph.style.width = "0vw";
function moveParagraph() {
	// p_width = p_width + 0.8;
	margin_left = margin_left - 0.15;
	//welcomeParagraph.style.width = `${p_width}vw`;
	welcomeParagraph.style.marginLeft = `${margin_left}vw`;
	if (margin_left < 1) {
		margin_left = 70;
	}
}
setInterval(moveParagraph, 15);
