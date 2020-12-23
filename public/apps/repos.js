"use strict";
export class Repositories {
	html_url = null;
	name = null;
	language = null;
	languages_url = null;
	description = null;
	id = null;
	updated_at = null;

	constructor(repoData) {
		Object.assign(this, repoData);
	}
	renderRepos() {
		let aEl = document.createElement("a");
		aEl.href = `${this.html_url}`;
		aEl.innerHTML = `${this.name}`;
		aEl.target = "_blank";
		let tableRow = document.createElement("tr");
		let tableCol1 = document.createElement("td");
		tableCol1.textContent = `${this.id}`;
		let tableCol2 = document.createElement("td");
		tableCol2.textContent = `${this.name}`;
		let tableCol3 = document.createElement("td");
		tableCol3.className = "td-description";
		tableCol3.textContent = `${this.description}`;
		let tableCol4 = document.createElement("td");
		tableCol4.appendChild(aEl);
		let tableCol5 = document.createElement("td");
		tableCol5.innerHTML = `${this.language} and <a href="${this.languages_url}" target="_blank">see all languages</a>`;
		let tableCol6 = document.createElement("td");
		tableCol6.textContent = `${this.updated_at}`;

		// append columns to the row
		tableRow.appendChild(tableCol1);
		tableRow.appendChild(tableCol2);
		tableRow.appendChild(tableCol3);
		tableRow.appendChild(tableCol4);
		tableRow.appendChild(tableCol5);
		tableRow.appendChild(tableCol6);

		return tableRow;
	}
}
