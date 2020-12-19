"use strict";
import { Repositories } from "./repos.js";
const tableContainer = document.getElementById("tableContainer");
const githubUsername = document.getElementById("github-username");
const requesButton = document.getElementById("request-repos");
const renderRepositories = function () {
	tableContainer.innerHTML = "";
	fetch(
		`https://api.github.com/users/${githubUsername.value}/repos?sort=updated`
	)
		.then((responds) => responds.json())
		.then((repoData) => {
			let tableEl = document.createElement("table");
			let tableHead = document.createElement("thead");
			let tableH1 = document.createElement("th");
			tableH1.textContent = "ID";
			let tableH2 = document.createElement("th");
			tableH2.textContent = "NAME";
			let tableH3 = document.createElement("th");
			tableH3.textContent = "DESCRIPTION";
			let tableH4 = document.createElement("th");
			tableH4.textContent = "URL";
			let tableH5 = document.createElement("th");
			tableH5.textContent = "LANGUAGE";
			let tableH6 = document.createElement("th");
			tableH6.textContent = "Last Update";
			let tableBody = document.createElement("tbody");
			tableHead.appendChild(tableH1);
			tableHead.appendChild(tableH2);
			tableHead.appendChild(tableH3);
			tableHead.appendChild(tableH4);
			tableHead.appendChild(tableH5);
			tableHead.appendChild(tableH6);
			tableEl.appendChild(tableHead);
			for (let i = 0; i < repoData.length; i++) {
				const newRepo = new Repositories(repoData[i]);
				const renderNewRepos = newRepo.renderRepos();

				tableBody.appendChild(renderNewRepos);
			}
			tableEl.appendChild(tableBody);
			tableContainer.appendChild(tableEl);
		})
		.catch((msg) => {
			console.log("Error message: ", msg);
		});
};

// run the function onkeyup by hitting the enter key
githubUsername.onkeyup = function (event) {
	if (event.keyCode !== 13) {
		return;
	}
	renderRepositories();
};
// run the function onclick by by clicking on the button
requesButton.onclick = renderRepositories;
// run the function on window load
window.onload = renderRepositories;
