const printPage = document.getElementById("print-page");

function removeExtras() {
	document.title = "";
	// document.URL = "";
	window.print();
}

printPage.onclick = removeExtras;
